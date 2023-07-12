import { S3Client } from '@aws-sdk/client-s3'

export const secretAccessKey = import.meta.env.VITE_S3SECRETKEY // IAM user secret key
export const accessKeyId = import.meta.env.VITE_S3ACCESSKEY // IAM user access id
export const bucket = import.meta.env.VITE_S3BUCKET // Bucket name
export const region = import.meta.env.VITE_S3REGION // Region
export const client = new S3Client({
    region,
    credentials: {
        secretAccessKey,
        accessKeyId
    }
})