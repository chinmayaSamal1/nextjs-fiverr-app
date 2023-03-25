import mongodbConnect from '@/database/app';
import { getConversation,createConversation,updateConversation } from '@/controllers/conversationController';
import { verifytoken } from '@/jwt/verifyToken';

export default async function handler(req, res) {
    mongodbConnect().catch(() => {
        res.status(404).json({ err: 'Error in the connection' });
    });
    const { method } = req;
    switch (method) {
        case 'GET':
            verifytoken(req, res);
            getConversation(req, res);
            break;
        case 'POST':
            verifytoken(req, res);
            createConversation(req, res);
            break;
        case 'PUT':
            verifytoken(req, res);
            updateConversation(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}
