// eslint-disable-next-line import/no-unresolved
import { createClient } from "npm:@supabase/supabase-js@2";
// eslint-disable-next-line import/no-unresolved
import { serve } from "std/server";

serve(async (req) => {
    const supabase = createClient(
        Deno.env.get("PROJECT_URL")!,
        Deno.env.get("PROJECT_ROLE_KEY")!,
    );

    const { data: mismatched } = await supabase
        .rpc("check_token_sync");

    return new Response(JSON.stringify({
        mismatched_count: mismatched?.length || 0,
        mismatched_users: mismatched,
    }));
});
