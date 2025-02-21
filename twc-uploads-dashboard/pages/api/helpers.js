import { v4 as uuidV4 } from 'uuid'
import { privateS3 } from './config/s3'
import fs from 'fs';
import QRCode from 'qrcode';
import path from 'path';

const prefix = 'TWC-UPLOAD'

const generateShortId = () => {
    return `${prefix}-${uuidV4().slice(0, 8)}`
}

const verifyShortId = (shortId) => {
    let isValid = true

    if (!shortId) {
        isValid = false
    }

    if (shortId && !shortId.startsWith(prefix)) {
        isValid = false
    }

    return isValid
}

// AWS
const uploadToS3 = async (file, shortId) => {
    const folderName = 'uploads'
    const { filepath, mimetype, originalFilename } = file;
    if (!filepath) throw new Error('No file path available for upload');
    const fileExt = path.extname(originalFilename);

    try {
        return await privateS3.upload({
            Bucket: process.env.AWS_PRIVATE_S3_BUCKET,
            Key: `${folderName}/${shortId}` + fileExt,        // S3 key for the uploaded file
            Body: fs.createReadStream(filepath),
            ContentType: mimetype,

        }).promise();
    } catch (err) {
        console.error('Error uploading to S3:', err);
        throw new Error('Error uploading file to S3');
    }
};

const getPresignedUrlByShortId = async (shortId) => {
    try {
        const presignedUrl = await privateS3.getSignedUrlPromise('getObject', {
            Bucket: process.env.AWS_PRIVATE_S3_BUCKET,
            Key: `uploads/${shortId}` + '.apk',
            Expires: 60 * 2 // URL expires in 2 minutes
        });
        return presignedUrl
    } catch (error) {
        throw new Error('Error generating presigned URL:', error);
    }
}

//Generate QRCode
const generateQRCode = async (shortUrl) => {
    try {
        return await QRCode.toDataURL(shortUrl);
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw new Error('Error generating QR code');
    }
};

export { generateShortId, verifyShortId, uploadToS3, getPresignedUrlByShortId, generateQRCode }