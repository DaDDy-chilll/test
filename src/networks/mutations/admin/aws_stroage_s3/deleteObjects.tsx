import ApiService from "@/networks/services"
import axios from "axios";

type PutObjectsReq = Array<PutObject>;

type PutObject = {
    key: string;
    url: string;
}

export type PresignResponse = {
    status: string;
    presign_urls: Array<PutObject>;
}

export const deleteObjects = (keys: Array<string>): Promise<Array<string>>=>{
    let deletedObjects:Array<string> = [];
    let putObjectsReq: PutObjectsReq = keys.map(key=>{
        return {
            key,url: ""
        }
    })
    return new Promise((resove,reject)=>{
        ApiService.admin.put("/aws-presign",putObjectsReq)
        .then(async(ans)=>{
            const presignResponse: PresignResponse = ans.data;
            for(let i=0;i<presignResponse.presign_urls.length;i++){
                await axios.delete(presignResponse.presign_urls[i].url)
                .then(()=>{
                    deletedObjects = [...deletedObjects,presignResponse.presign_urls[i].key];
                });
            }
            resove(deletedObjects);
        })
        .catch(err=>{
            reject(err);
        })
    })
}