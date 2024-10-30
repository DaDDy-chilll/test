import { fetchServer } from "@/utils/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/utils/queryKey";

type usePostProps = {
  token?: string | null;
  queryKey?: QueryKey | null;
};

type parms = {
  endpoint: string;
  body: any;
  method?: "POST" | "PUT" | "DELETE";
};

/**
 * This hook is used to perform POST, PUT, or DELETE requests to the server
 * and optionally invalidate a query in the react-query cache.
 * @param {usePostProps} param0 - The token and queryKey for the request.
 * @returns {object} - The mutate function, isPending, error, isSuccess, and data.
 * @autor PSK
 */
const usePost = ({ token = "", queryKey = null }: usePostProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isSuccess, data } = useMutation({
    /**
     * This function is used to perform the server request.
     * @param {parms} param0 - The endpoint, body, and method for the request.
     * @returns {Promise} - The server response.
     * @autor PSK
     */
    mutationFn: ({ endpoint, body, method }: parms) => {
      return fetchServer({
        endpoint,
        method: method || "POST",
        body,
        token: token || undefined,
      });
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    },
  });

  return { mutate, isPending, error, isSuccess, data };
};

export default usePost;
