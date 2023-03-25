import mongodbConnect from '@/database/app';
import { createGig, deleteGig, getGig } from '@/controllers/gigController';
import { verifytoken } from '@/jwt/verifyToken';

export default async function handler(req, res) {
    mongodbConnect().catch(() => {
        res.status(404).json({ err: 'Error in the connection' });
    });
    const { method } = req;
    switch (method) {
        case 'GET':
            getGig(req, res);
            break;
        case 'POST':
            verifytoken(req, res);
            createGig(req, res);
            break;
        case 'DELETE':
            verifytoken(req, res);
            deleteGig(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}
