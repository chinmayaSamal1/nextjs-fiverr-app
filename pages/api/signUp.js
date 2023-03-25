import mongodbConnect from '@/database/app';
import { signUp } from '@/controllers/authController';

export default async function handler(req, res) {
    mongodbConnect().catch(() => {
        res.status(404).json({ err: 'Error in the connection' });
    });
    const { method } = req;
    switch (method) {
        case 'POST':
            signUp(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}
