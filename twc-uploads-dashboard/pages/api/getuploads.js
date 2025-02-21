import UploadBuilds from './models/UploadBuilds';

export const config = { api: { bodyParser: false, }, };

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const uploads = await UploadBuilds.findAll({
            attributes: ['id', 'shortId', 'fileType', 's3Key', 'createdAt', 'updatedAt'],
        });

        return res.status(200).json({ uploads });
    } catch (err) {
        console.error('Error fetching uploads:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default handler;
