import { fetchServer } from "@/utils/helper";
import {useQuery } from "@tanstack/react-query";

const useFetch = (endpoint:string,token?:string) => {

   const {data,isLoading,isError,isSuccess,error} = useQuery({
    queryKey:[endpoint],
    queryFn:()=>{
        if(!token && !endpoint) throw new Error("Token and endpoint are required")
        return fetchServer({endpoint,method:"GET",token})
    }
   })

   return {data,isLoading,isError,isSuccess,error}  
}

export default useFetch;