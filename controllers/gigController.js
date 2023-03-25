import Gig from '@/models/gigModel';
import errHandler from './errController';

export async function getAllGig(req, res) {
    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && {
            price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
        }),
        ...(q.search && { title: { $regex: q.search, $options: 'i'  } }),
    };
    try {
        const gigs = await Gig.find(filters);
        res.status(200).json({
            gigs,
        });
    } catch (error) {
        res.status(405).json({
            status: 'failed',
        });
    }
}

export const createGig = async (req, res) => {
    try {
        if (!req.isSeller)
            return res.status(403).json({
                status: 'failed',
                message: 'you are not a seller',
            });
        const newGig = {
            userId: req.userId,
            ...req.body,
        };
        const gig = await Gig.create(newGig);
        res.status(201).json({
            status: 'success',
            gig,
        });
    } catch (error) {
        errHandler(error, req, res);
    }
};

export async function getGig(req, res) {
    try {
        const gig = await Gig.findById(req.query.id);
        if (!gig)
            return res.status(405).json({
                status: 'failed',
                message: 'no gig',
            });
        res.status(200).json({
            gig,
        });
    } catch (error) {
        errHandler(error, req, res);
    }
}

export async function deleteGig(req, res) {
    try {
        const gig = await Gig.findById(req.query.id);
        if (!gig)
            return res.status(405).json({
                status: 'failed',
                message: 'no gig',
            });
        if (req.userId !== gig.userId)
            return res.status(403).json({ status: 'failed', message: 'you are not allowed' });
        await Gig.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        errHandler(error, req, res);
    }
}
