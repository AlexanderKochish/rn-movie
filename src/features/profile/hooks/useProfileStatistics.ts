import { useQuery } from "@tanstack/react-query";
import { getProfileStatistics } from "../api/getProfileStatistics";

export const useProfileStatistics = (userId: string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["statistics"],
        queryFn: async () => await getProfileStatistics(userId),
    });

    return {
        data,
        ...rest,
    };
};
