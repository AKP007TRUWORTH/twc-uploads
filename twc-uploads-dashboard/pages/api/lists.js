import { privateS3 } from './config/s3';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  const params = {
    Bucket: process.env.AWS_PRIVATE_S3_BUCKET,
    Prefix: 'uploads/',
  };
  try {
    const data = await privateS3.listObjectsV2(params).promise();
    const apkFiles = data.Contents
      .filter(item => item.Key.endsWith('.apk'))
      .map(item => ({
        key: item.Key,
        lastModified: item.LastModified,
        size: item.Size,
      }))
      .sort((a,b)=> b.lastModified - a.lastModified);

      return res.status(200).json({ apkFiles });
  } catch (err) {
    console.error('Error listing APKs:', err);
    return res.status(500).json({ error: 'Error retrieving APK list' });
  }
};
export default handler;