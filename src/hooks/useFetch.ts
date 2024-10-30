import { fetchServer } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";

type UseFetchType = {
  endpoint: string | null;
  token?: string;
  key?: string;
  enabled?: boolean | string | undefined;
};

/**
 * This hook is used to fetch data from the server
 * @param {UseFetchType} param0 - The parameters for the fetch request
 * @param {string | null} param0.endpoint - The endpoint to fetch data from
 * @param {string} [param0.token] - The token for authentication
 * @param {string} [param0.key] - The key for the query
 * @param {boolean | string | undefined} [param0.enabled] - Whether the query is enabled
 * @returns {object} The data, loading state, error state, success state, error, and refetch function
 * @author PSK
 */
const useFetch = ({ endpoint, token, key, enabled }: UseFetchType) => {
  const { data, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: [key as string],
    queryFn: () => {
      if (!token && !endpoint)
        throw new Error("Token and endpoint are required");
      return fetchServer({
        endpoint,
        method: "GET",
        token: token || undefined,
      });
    },
    enabled: !!enabled || !!token,
  });

  return { data, isLoading, isError, isSuccess, error, refetch };
};

export default useFetch;
