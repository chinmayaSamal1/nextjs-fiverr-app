import mongodbConnect from '@/database/app';
import { getAllUser, updateUser, deleteUser } from '@/controllers/userController';
import { verifytoken } from '@/jwt/verifyToken';

export default async function handler(req, res) {
    mongodbConnect().catch(() => {
        res.status(404).json({ err: 'Error in the connection' });
    });
    const { method } = req;
    switch (method) {
        case 'GET':
            getAllUser(req, res);
            break;
        case 'PUT':
            updateUser(req, res);
            break;
        case 'DELETE':
            verifytoken(req, res);
            deleteUser(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}
