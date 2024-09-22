import { fetchServer } from "@/utils/helper";
import {useQuery } from "@tanstack/react-query";


type UseFetchType = {
    endpoint:string | null,
    token?:string,
    key?:string
}

const useFetch = ({endpoint,token,key}:UseFetchType) => {

   const {data,isLoading,isError,isSuccess,error} = useQuery({
    queryKey:[key || endpoint],
    queryFn:()=>{
        if (!token && !endpoint) throw new Error("Token and endpoint are required")
        return fetchServer({endpoint, method: "GET", token: token || undefined})
    },
    enabled:!!endpoint
   })

   return {data,isLoading,isError,isSuccess,error}  
}

export default useFetch;