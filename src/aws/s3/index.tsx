import { getUrl } from './getUrl';

/*
Date: 2023-12-17
Person: AKMAAMM
Refference: https://github.com/IntegratedSolution/AWS-S3-React-Spring-Docs
Note: npm install aws-sdk
config: add vite.config.ts 
    export default defineConfig({
        ...,
        define: {
            global: "window"
        }
    })
*/

export const S3_BUCKET = "euphoria-shop-s3-bucket";
export const REGION =  "ap-northeast-1";

// AWS.config.update({
//     accessKeyId: "",
//     secretAccessKey: ""
// });

// export const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET},
//     region: REGION,
// });

const s3 = {
    getUrl
}

export default s3;