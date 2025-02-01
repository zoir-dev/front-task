import { useQueryClient, useQuery } from "@tanstack/react-query";

export function useStore<T = unknown>(key: string) {
    const queryClient = useQueryClient();

    const setStore = (data: T) => {
        queryClient.setQueryData([key], data);
    };

    const { data: store } = useQuery<T>({
        queryKey: [key],
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    });

    function clear() {
        queryClient.removeQueries({ queryKey: [key] });
    }

    return { store, setStore, clear };
}
