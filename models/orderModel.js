import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        gigId: {
            type: String,
            required: true,
        },
        img: String,
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        sellerId: {
            type: String,
            required: true,
        },
        buyerId: {
            type: String,
            required: true,
        },
        isCompleted: Boolean,
        paymentIntent: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
mongoose.models = {};
const Order = mongoose.model('Order', orderSchema);

export default Order;
