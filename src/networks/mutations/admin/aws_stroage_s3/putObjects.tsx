import ApiService from "@/networks/services";
import { ProductPhoto } from "@/components/PreviewImageComponent";
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

export const putObjects = (files: Array<ProductPhoto>): Promise<Array<ProductPhoto>> => {
    let putObjectsReq: PutObjectsReq = [];

    const updatedFiles = files.map((file)=>{
        const key = new Date().toISOString() + ":" + file.file?.name;
        putObjectsReq = [...putObjectsReq,{key: key,url: ""}];
        file.tempUrl=key;
        return file;
    })

    return new Promise((resove,reject)=>{
        ApiService.admin.post("/aws-presign",putObjectsReq)
        .then(async(ans)=>{
            const presignResponse: PresignResponse = ans.data;
            for(let i=0;i<presignResponse.presign_urls.length;i++){
                await axios.put(
                    presignResponse.presign_urls[i].url, // aws presign url uncode link
                    files[i].file, // upload file to s3
                    {
                        headers:{
                            "Content-Type": files[i].file?.type // content-type for header
                        } 
                    }
                )
                .then(()=>{
                    // createdObjects = [...createdObjects,presignResponse.presign_urls[i].key];
                });
            }
            resove(updatedFiles);
        })
        .catch(err=>{
            reject(err);
        })
    })
}

export const putObjectsOld = (files: FileList): Promise<Array<string>>=>{
    let putObjectsReq: PutObjectsReq = [];
    let createdObjects:Array<string> = [];
    for(let i=0;i<files.length;i++){
        const putObject: PutObject = {
            key: new Date().toISOString() + ":" + files[i].name,
            url: ""
        }
        putObjectsReq = [...putObjectsReq,putObject];
    }
    return new Promise((resove,reject)=>{
        ApiService.admin.post("/aws-presign",putObjectsReq)
        .then(async(ans)=>{
            const presignResponse: PresignResponse = ans.data;
            for(let i=0;i<presignResponse.presign_urls.length;i++){
                await axios.put(presignResponse.presign_urls[i].url,files[i],{headers:{"Content-Type": files[i].type}})
                .then(()=>{
                    createdObjects = [...createdObjects,presignResponse.presign_urls[i].key];
                });
            }
            resove(createdObjects);
        })
        .catch(err=>{
            reject(err);
        })
    })
}