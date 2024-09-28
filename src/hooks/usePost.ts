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
    const { mutate,isPending,error}  = useMutation({
        mutationFn:({endpoint, body}:parms) => {
            return fetchServer({ endpoint, method: "POST", body, token: token || undefined })
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:[queryKey]})
        }
    })

    return {mutate,isPending,error}
}

export default usePost;