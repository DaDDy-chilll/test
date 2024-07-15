import { REGION, S3_BUCKET } from ".";

interface GetUrlProps {
    key: string;
}

export const getUrl = ({key}:GetUrlProps): string=>{
    return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(key)}`;
}

/* Usage 

aws.s3.getUrl({key: "2023-12-13T05:34:00.132Z.jpeg"})

*/