import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import { profileRepository } from "../api/profile.repository";

export const useProfile = () => {
  const { user } = useAuth();

  const { data, ...rest } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    queryFn: () => profileRepository.getProfile(user?.id),
    staleTime: 0,
  });

  return { profile: data, ...rest };
};
