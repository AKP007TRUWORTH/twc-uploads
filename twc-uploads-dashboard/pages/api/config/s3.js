import { S3 } from 'aws-sdk'

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET
})

const privateS3 = new S3({
    accessKeyId: process.env.AWS_PRIVATE_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_S3_SECRET,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
})

export { privateS3, s3 }