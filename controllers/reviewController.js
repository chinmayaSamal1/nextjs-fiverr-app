import Reviews from '@/models/reviewModel';
import errHandler from './errController';
import Gig from '@/models/gigModel';

export async function createReview(req, res) {
    try {
        if (req.isSeller)
            return res.status(201).json({
                status: 'failed',
                message: "Sellers can't give review",
            });
        const newReview = {
            userId: req.userId,
            gigId: req.body.gigId,
            stars: req.body.stars,
            desc: req.body.desc,
        };
        const checkReview = await Reviews.findOne({
            gigId: req.body.gigId,
            userId: req.userId,
        });
        if (checkReview)
            return res.status(201).json({
                status: 'failed',
                message: 'already given an review',
            });
        const review = await Reviews.create(newReview);
        await Gig.findByIdAndUpdate(req.body.gigId, { $inc: { totalStars: req.body.stars, starNumber: 1 } });
        res.status(201).json({
            status: 'success',
            review,
        });
    } catch (error) {
        errHandler(error, req, res);
    }
}

export async function getReviews(req, res) {
    try {
        const reviews = await Reviews.find({ gigId: req.query.id });
        res.status(201).json({
            reviews,
        });
    } catch (error) {
        errHandler(error, req, res);
    }
}

export async function deleteReview(req, res) {
    try {
        const review = await Reviews.findById(req.query.id);
        if (review.userId != req.userId)
            return res.status(203).json({
                status: 'failed',
                message: 'Unauthorised Access',
            });
        await Reviews.findByIdAndDelete(req.query.id);
        res.status(201).json({
            status: 'success',
        });
    } catch (error) {
        errHandler(error, req, res);
    }
}
