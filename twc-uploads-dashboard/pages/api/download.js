import { getPresignedUrlByShortId, verifyShortId } from './helpers';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { shortId } = req.query;

        if (!verifyShortId(shortId)) {
            return res.status(400).json({ error: 'Valid shortId is required' });
        }

        try {
            const presignedUrl = await getPresignedUrlByShortId(shortId)
            return res.status(200).json({ url: presignedUrl });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error generating presigned URL' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}