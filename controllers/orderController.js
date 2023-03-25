import Order from '@/models/orderModel';
import Gig from '@/models/gigModel';
import errHandler from './errController';

export async function createOrder(req, res) {
    try {
        const gig = await Gig.findById(req.query.id);
        const newOrder = {
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: req.userId,
            sellerId: gig.userId,
            price: gig.price,
            paymentIntent: 'temporary',
        };
        const order = await Order.create(newOrder);
        res.status(200).json({
            status: 'success',
            order,
        });
    } catch (error) {
        errHandler(error, req, res);
    }
}

export async function getOrders(req, res) {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            // isCompleted: true,
        });
        res.status(201).json({
            orders,
        });
    } catch (error) {}
}
