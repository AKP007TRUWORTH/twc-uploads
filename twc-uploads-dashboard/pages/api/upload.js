import sequelize from './config/db';
import { IncomingForm } from 'formidable';
import { generateQRCode, generateShortId, getPresignedUrlByShortId, uploadToS3 } from './helpers';
import UploadBuilds from './models/UploadBuilds';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const form = new IncomingForm({
    keepExtensions: true,
    maxFileSize: 500 * 1024 * 1024, // 500MB
    maxTotalFileSize: 500 * 1024 * 1024, // 500MB
  });

  try {
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(new Error('Failed to parse form'));
        resolve({ fields, files });
      });
    });

    const uploadedFile = files.file?.[0];
    if (!uploadedFile) return res.status(400).json({ error: 'No file uploaded' });
    const shortId = generateShortId();
    const { Key } = await uploadToS3(uploadedFile, shortId);
    const presignedUrl = await getPresignedUrlByShortId(shortId);
    const qrCodeUrl = await generateQRCode(presignedUrl);

    const newUploadBuild = await UploadBuilds.create({
      shortId,
      fileType: 'apk',
      s3Key: Key,
      createdAt: new Date(), // manually set createdAt
      updatedAt: new Date(), // manually set updatedAt
    });


    return res.status(200).json({
      message: 'File uploaded successfully!',
      fileUrl: presignedUrl,
      qrCodeUrl,
      uniqueId: shortId,
      Key,
    });
  } catch (err) {
    console.error('Error processing the upload:', err);
    if (err.message.includes('parse form')) {
      return res.status(400).json({ error: 'Invalid form data' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;