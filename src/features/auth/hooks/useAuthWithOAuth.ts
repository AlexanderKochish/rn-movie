import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useAuth } from "./useAuth";
import { useGithubSignIn } from "./useGithubSignIn";
import { useGoogleSignIn } from "./useGoogleSignIn";

type OAuthProviders = "google" | "github" | "facebook";

export const useAuthWithOAuth = () => {
    const { signInWithGithub } = useGithubSignIn();
    const { signInWithGoogle } = useGoogleSignIn();
    const { user } = useAuth();
    const router = useRouter();
    const signInWithOAuth = async (provider: OAuthProviders) => {
        switch (provider) {
            case "github":
                return await signInWithGithub();
            case "google":
                return await signInWithGoogle();
            default:
                break;
        }
    };

    const handleSignInWitOAuth = async (provider: OAuthProviders) => {
        try {
            await signInWithOAuth(provider);
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert("Error", "Failed to sign in try again");
            }
            throw error;
        }
    };

    return {
        handleSignInWitOAuth,
    };
};
