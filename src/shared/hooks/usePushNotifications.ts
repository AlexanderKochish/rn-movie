import { useProfile } from "@/src/features/profile/hooks/useProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../services/supabase";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";

export const usePushNotifications = () => {
  const router = useRouter();
  const { profile: user } = useProfile();
  const queryClient = useQueryClient();

  const { data: expoPushToken } = useQuery({
    queryKey: ["push-notification-token"],
    queryFn: registerForPushNotificationsAsync,
    staleTime: Infinity,
  });

  const saveTokenMutation = useMutation({
    mutationFn: async (token: string) => {
      if (!user?.id) throw new Error("User not authenticated");

      const [profileResult, subscriptionResult] = await Promise.all([
        supabase
          .from("profiles")
          .update({ expo_push_token: token, notifications: true })
          .eq("id", user.id),

        supabase
          .from("user_notification_subscriptions")
          .upsert({
            user_id: user.id,
            expo_push_token: token,
            is_active: true,
            last_notification_sent_at: new Date().toISOString(),
          }, { onConflict: "user_id,expo_push_token" }),
      ]);

      if (profileResult.error) throw profileResult.error;
      if (subscriptionResult.error) throw subscriptionResult.error;

      return token;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", user?.id] });
      queryClient.invalidateQueries({
        queryKey: ["profile-notification-preferences", user?.id],
      });
    },
  });

  const { data: existingToken } = useQuery({
    queryKey: ["user-push-token", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("profiles")
        .select("expo_push_token")
        .eq("id", user.id)
        .single();
      return data?.expo_push_token;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (
      expoPushToken && user?.id && expoPushToken !== existingToken &&
      expoPushToken !== "EMULATOR_DEMO_TOKEN"
    ) {
      saveTokenMutation.mutate(expoPushToken);
    }
  }, [expoPushToken, user?.id, existingToken, saveTokenMutation]);

  useEffect(() => {
    const notificationSubscription = Notifications
      .addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    const responseSubscription = Notifications
      .addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data.type === "new_movie" && typeof data.movie_id === "string") {
          router.push({
            pathname: `/(movie)/[movieId]`,
            params: { movieId: data.movie_id },
          });
        }
      });

    return () => {
      notificationSubscription.remove();
      responseSubscription.remove();
    };
  }, [router]);

  return {
    expoPushToken,
    isSavingToken: saveTokenMutation.isPending,
    saveError: saveTokenMutation.error,
    hasPushError: !!saveTokenMutation.error,
    refetchToken: () =>
      queryClient.invalidateQueries({
        queryKey: ["push-notification-token"],
      }),

    clearError: () => saveTokenMutation.reset(),
  };
};
