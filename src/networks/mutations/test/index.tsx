import ApiService from "@/networks/services";

const test = {
    withParams: ()=>{
        const params = new URLSearchParams();
        params.append("name","amie lay")
        return ApiService.auth.get("/pub/test",{params: params});
    },
    withFormData: ()=>{
        const form = new FormData();
        form.append("mail", "admin@gmail.com");
        form.append("password","admin");
        return ApiService.auth.post("/login",form);
    }
}

export default test;