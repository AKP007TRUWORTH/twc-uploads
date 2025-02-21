import { privateS3 } from './config/s3';  // Ensure 'privateS3' is properly configured.
export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log('Query Parameters:', req.query); // Debugging line
        const { shortId, originalFilename } = req.query;
        // Validate the inputs
        if (!shortId || typeof shortId !== 'string' || shortId.trim() === '') {
            return res.status(400).json({ error: 'Valid shortId is required' });
        }
        if (!originalFilename || typeof originalFilename !== 'string' || originalFilename.trim() === '') {
            return res.status(400).json({ error: 'Valid originalFilename is required' });
        }
        // Construct the S3 key based on shortId and originalFilename
        const s3Key = `uploads/${shortId}_${originalFilename}`;
        const params = {
            Bucket: process.env.AWS_PRIVATE_S3_BUCKET,
            Key: s3Key,
            Expires: 60 * 2 // URL expires in 2 minutes
        };
        try {
            const presignedUrl = await privateS3.getSignedUrlPromise('getObject', params);
            return res.status(200).json({ url: presignedUrl });
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            return res.status(500).json({ error: 'Error generating presigned URL' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


