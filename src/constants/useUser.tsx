import { useGet } from "@/hooks/useGet";
import { useQueryClient } from "@tanstack/react-query";

export function useUser() {
    const queryClient = useQueryClient();

    const { data, refetch, isFetching } = useGet<{
        fullname: string;
        login: string;
    }>("auths/get-info", undefined, {
        enabled: !!localStorage.getItem("token"),
    });

    function remove() {
        queryClient.removeQueries({ queryKey: ["auths/get-info"] });
    }
    return {
        ...data,
        isFetching,
        refetch,
        remove,
    };
}
