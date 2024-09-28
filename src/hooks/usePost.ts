import { fetchServer } from "@/utils/helper"
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { QueryKey } from "@/utils/queryKey"

type usePostProps = {
    token: string | null
    queryKey: QueryKey
}

type parms = {
    endpoint: string
    body: any

}

const usePost = ({token,queryKey}:usePostProps) => {
    const queryClient = useQueryClient()
    const { mutate,isPending,error,isSuccess}  = useMutation({
        mutationFn:({endpoint, body}:parms) => {
            return fetchServer({ endpoint, method: "POST", body, token: token || undefined })
        },
        onSuccess:(data) => {
            queryClient.invalidateQueries({queryKey:[queryKey]})
            console.log("server post return",data)
        }
    })

    return {mutate,isPending,error,isSuccess}
}

export default usePost;