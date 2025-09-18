import { useRouter } from "expo-router";
import { useAuth } from "./useAuth";
import { useGithubSignIn } from "./useGithubSignIn";
import { useGoogleSignIn } from "./useGoogleSignIn";

type OAuthProviders = "google" | "github" | "facebook";

export const useAuthWithOAuth = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { signInWithGithub } = useGithubSignIn();
    const { signInWithGoogle } = useGoogleSignIn();
    const signInWithOAuth = (provider: OAuthProviders) => {
        if (!user?.user_metadata.accepted_terms) {
            router.push("/(auth)/accept-terms");
        }
        switch (provider) {
            case "github":
                return signInWithGithub();
            case "google":
                return signInWithGoogle();
            default:
                return null;
        }
    };

    return {
        signInWithOAuth,
    };
};
