import { createOrder, getOrders } from '@/controllers/orderController';
import mongodbConnect from '@/database/app';
import { verifytoken } from '@/jwt/verifyToken';

export default async function handler(req, res) {
    mongodbConnect().catch(() => {
        res.status(404).json({ err: 'Error in the connection' });
    });
    const { method } = req;
    switch (method) {
        case 'GET':
            verifytoken(req, res);
            getOrders(req, res);
            break;
        case 'POST':
            verifytoken(req, res);
            createOrder(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}
