import { supabase } from "@/src/shared/services/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { signInSchema, signInSchemaType } from "../lib/zod/sign-in.schema";
import { useGithubSignIn } from "./useGithubSignIn";
import { useGoogleSignIn } from "./useGoogleSignIn";

export const useSignIn = () => {
  const { signInWithGithub } = useGithubSignIn();
  const { signInWithGoogle } = useGoogleSignIn();
  const router = useRouter();
  const { control, handleSubmit, setError } = useForm<signInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const checkUserAuthProvider = async (email: string) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/check-auth-provider`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();
      return data.provider || "email";
    } catch (error) {
      console.error("Error checking auth provider:", error);
      return null;
    }
  };

  const onSubmit = async (formData: signInSchemaType) => {
    try {
      const authProvider = await checkUserAuthProvider(formData.email);

      if (authProvider && authProvider !== "email") {
        Alert.alert(
          "Login method",
          `You are registered via ${authProvider}. Please sign in with ${authProvider}.`,
          [
            {
              text: "Login via " + authProvider,
              onPress: () => {
                signInWithOAuth(authProvider as "google" | "github");
              },
            },
            { text: "Cancel", style: "cancel" },
          ],
        );
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          Alert.alert(
            "Login error",
            "Incorrect email or password. Check the data or use password recovery.",
          );
        } else {
          Alert.alert("Authentication error", error.message);
        }
        return;
      }

      if (data.session) {
        router.replace("/(tabs)/profile");
      }
    } catch (error: unknown) {
      let message = "An unexpected error occurred.";
      if (error instanceof Error) {
        message = error.message;
      }
      Alert.alert("Login error", message);
    }
  };

  const signInWithOAuth = (provider: "google" | "github") => {
    switch (provider) {
      case "google":
        return signInWithGoogle();
      case "github":
        return signInWithGithub();
      default:
        return null;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "rnmovieapp://reset-password",
    });

    if (error) {
      Alert.alert("Error", "Failed to send password reset email");
    } else {
      Alert.alert(
        "Successful",
        "Password reset email has been sent to your email",
      );
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    signInWithOAuth,
    resetPassword,
  };
};
