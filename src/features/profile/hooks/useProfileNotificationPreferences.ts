import { usePushNotifications } from "@/src/shared/hooks/usePushNotifications";
import { supabase } from "@/src/shared/services/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { profileRepository } from "../api/profile.repository";
import { useProfile } from "./useProfile";

export const useProfileNotificationPreferences = () => {
  const { profile: user } = useProfile();
  const queryClient = useQueryClient();
  const { expoPushToken } = usePushNotifications();

  const {
    data: preferences,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile-notification-preferences", user?.id],
    queryFn: () =>
      profileRepository.getProfileNotificationPreferences(user?.id),

    enabled: !!user?.id,
  });

  const updatePreferenceMutation = useMutation({
    mutationFn: async ({
      field,
      value,
    }: {
      field: "marketing_emails" | "notifications";
      value: boolean;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");

      const updateData: any = { [field]: value };
      let currentExpoToken = expoPushToken;

      if (!currentExpoToken && preferences?.expo_push_token) {
        currentExpoToken = preferences.expo_push_token;
      }

      if (field === "notifications") {
        if (value && currentExpoToken) {
          updateData.expo_push_token = currentExpoToken;

          const { error: subError } = await supabase
            .from("user_notification_subscriptions")
            .upsert({
              user_id: user.id,
              expo_push_token: currentExpoToken,
              is_active: true,
              last_notification_sent_at: new Date().toISOString(),
            }, {
              onConflict: "user_id,expo_push_token",
            });

          if (subError) {
            console.error("Subscription update error:", subError);
          }
        } else if (!value) {
          updateData.expo_push_token = null;

          const { error: subError } = await supabase
            .from("user_notification_subscriptions")
            .update({ is_active: false })
            .eq("user_id", user.id);

          if (subError) {
            console.error("Subscription deactivation error:", subError);
          }
        }
      }

      if (field === "marketing_emails") {
        try {
          if (value) {
            const { error: newsletterError } = await supabase
              .from("newsletter_subscribers")
              .upsert({
                email: user.email,
                is_active: true,
              }, {
                onConflict: "email",
              });

            if (newsletterError) {
              console.error("Newsletter subscription error:", newsletterError);
            }
          } else {
            const { error: newsletterError } = await supabase
              .from("newsletter_subscribers")
              .update({ is_active: false })
              .eq("email", user.email);

            if (newsletterError) {
              console.error(
                "Newsletter unsubscription error:",
                newsletterError,
              );
            }
          }
        } catch (newsletterError) {
          console.error("Newsletter operation error:", newsletterError);
        }
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
        throw profileError;
      }

      return { field, value };
    },
    onMutate: async ({ field, value }) => {
      await queryClient.cancelQueries({
        queryKey: ["profile-notification-preferences", user?.id],
      });

      const previousPreferences = queryClient.getQueryData([
        "profile-notification-preferences",
        user?.id,
      ]);

      queryClient.setQueryData(
        ["profile-notification-preferences", user?.id],
        (old: any) => ({ ...old, [field]: value }),
      );

      return { previousPreferences };
    },
    onError: (err, variables, context) => {
      console.error("Update preference error:", err);
      Alert.alert("Error", "Failed to update settings");

      if (context?.previousPreferences) {
        queryClient.setQueryData(
          ["profile-notification-preferences", user?.id],
          context.previousPreferences,
        );
      }
    },
    onSuccess: (data) => {
      console.log("Preferences updated successfully:", data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-notification-preferences", user?.id],
      });
    },
  });

  const updateMarketingEmails = (value: boolean) => {
    updatePreferenceMutation.mutate({ field: "marketing_emails", value });
  };

  const updateNotifications = (value: boolean) => {
    updatePreferenceMutation.mutate({ field: "notifications", value });
  };

  return {
    preferences: preferences || {
      marketing_emails: false,
      notifications: false,
      expo_push_token: null,
    },
    isLoading,
    error,
    updatePreference: updatePreferenceMutation.mutate,
    updateMarketingEmails,
    updateNotifications,
    isUpdating: updatePreferenceMutation.isPending,
  };
};
