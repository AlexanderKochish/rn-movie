import { useQuery } from "@tanstack/react-query";
import { profileRepository } from "../api/profile.repository";

export const useProfileStatistics = (userId: string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["statistics", userId],
        queryFn: async () =>
            await profileRepository.getProfileStatistics(userId),
        enabled: !!userId,
    });

    return {
        data,
        ...rest,
    };
};
