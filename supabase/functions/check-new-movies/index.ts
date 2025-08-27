import { createClient, SupabaseClient } from "@supabase/supabase-js";
// eslint-disable-next-line import/no-unresolved
import { serve } from "std/server";
import { Movie } from "../types.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "x-client-info, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    console.log(
        "TMDB_API_KEY:",
        Deno.env.get("TMDB_API_KEY") ? "set" : "not set",
    );

    try {
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL")!,
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );

        const TMDB_API_KEY = Deno.env.get("TMDB_API_KEY") ||
            "86a7a80b73387f2e323987bf390cda9f";
        if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY not set");

        const tmdbResponse = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
        );

        if (!tmdbResponse.ok) {
            throw new Error(`TMDB API error: ${tmdbResponse.status}`);
        }

        const tmdbData = await tmdbResponse.json();
        const latestMovies = tmdbData.results.slice(0, 3);

        let newMoviesCount = 0;

        for (const movie of latestMovies) {
            const { data: existingMovie } = await supabase
                .from("movie_notifications")
                .select("id")
                .eq("tmdb_id", movie.id)
                .single();

            if (!existingMovie) {
                await sendMovieNotifications(supabase, movie);
                newMoviesCount++;

                await supabase
                    .from("movie_notifications")
                    .insert({
                        tmdb_id: movie.id,
                        title: movie.title,
                        release_date: movie.release_date,
                        poster_path: movie.poster_path,
                    });
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                newMoviesCount,
                message: `Found ${newMoviesCount} new movies`,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Unknown error";

        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});

async function sendMovieNotifications(supabase: SupabaseClient, movie: Movie) {
    const { data: subscribers } = await supabase
        .from("user_notification_subscriptions")
        .select("expo_push_token")
        .eq("is_active", true)
        .not("expo_push_token", "is", null);

    if (!subscribers || subscribers.length === 0) return;

    for (const subscriber of subscribers) {
        try {
            const message = {
                to: subscriber.expo_push_token,
                sound: "default",
                title: "🎬 New Movie!",
                body: `Just came out: ${movie.title || movie.original_title}`,
                data: {
                    type: "new_movie",
                    movie_id: movie.id.toString(),
                    movie_title: movie.title,
                    screen: "MovieDetails",
                    params: JSON.stringify({ id: movie.id }),
                },
            };

            const pushResponse = await fetch(
                "https://exp.host/--/api/v2/push/send",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(message),
                },
            );
            console.log(
                "Expo push status:",
                pushResponse.status,
                await pushResponse.text(),
            );
            await supabase
                .from("notification_delivery_logs")
                .insert({
                    expo_push_token: subscriber.expo_push_token,
                    movie_id: movie.id,
                    status: pushResponse.ok ? "sent" : "failed",
                    error_message: pushResponse.ok
                        ? null
                        : `HTTP ${pushResponse.status}`,
                });

            if (!pushResponse.ok) {
                const errorText = await pushResponse.text();
                throw new Error(
                    `HTTP error! status: ${pushResponse.status}, message: ${errorText}`,
                );
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : "Unknown error";
            await supabase
                .from("notification_delivery_logs")
                .insert({
                    expo_push_token: subscriber.expo_push_token,
                    movie_id: movie.id,
                    status: "failed",
                    error_message: errorMessage,
                });
        }
    }
}
