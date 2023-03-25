import mongodbConnect from '@/database/app';
import { createReview, deleteReview, getReviews } from '@/controllers/reviewController';
import { verifytoken } from '@/jwt/verifyToken';

export default async function handler(req, res) {
    mongodbConnect().catch(() => {
        res.status(404).json({ err: 'Error in the connection' });
    });
    const { method } = req;
    switch (method) {
        case 'GET':
            getReviews(req, res);
            break;
        case 'POST':
            verifytoken(req, res);
            createReview(req, res);
            break;
        case 'DELETE':
            verifytoken(req, res);
            deleteReview(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}
