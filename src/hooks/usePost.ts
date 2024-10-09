import { fetchServer } from "@/utils/helper"
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { QueryKey } from "@/utils/queryKey"

type usePostProps = {
    token?: string | null
    queryKey?: QueryKey | null
}

type parms = {
    endpoint: string
    body: any
    method?: "POST" | "PUT" | "DELETE"
}

const usePost = ({token='',queryKey=null}:usePostProps ) => {
    const queryClient = useQueryClient()
    const { mutate,isPending,error,isSuccess,data}  = useMutation({
        mutationFn:({endpoint, body, method}:parms) => {
            return fetchServer({ endpoint, method: method || "POST", body, token: token || undefined })
        },
        onSuccess:(data) => {
            if(queryKey){
                queryClient.invalidateQueries({queryKey:[queryKey]})
            }
        }
    })

    return {mutate,isPending,error,isSuccess,data}
}

export default usePost;