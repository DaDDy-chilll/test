import { fetchServer } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";


type UseFetchType = {
    endpoint: string | null,
    token?: string,
    key?: string,
    enabled?: boolean | string | undefined
}

const useFetch = ({ endpoint, token, key, enabled }: UseFetchType) => {

    const { data, isLoading, isError, isSuccess, error, refetch } = useQuery({
        queryKey: [key as string],
        queryFn: () => {
            if (!token && !endpoint) throw new Error("Token and endpoint are required")
            return fetchServer({ endpoint, method: "GET", token: token || undefined })
        },
        enabled: !!enabled || !!token
    })

    return { data, isLoading, isError, isSuccess, error, refetch }
}

export default useFetch;