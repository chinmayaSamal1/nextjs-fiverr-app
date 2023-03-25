import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        totalStars: {
            type: Number,
            default: 0,
        },
        starNumbers: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        img: [String],
        shortTitle: {
            type: String,
            required: true,
        },
        shortDesc: {
            type: String,
            required: true,
        },
        deliveryTime: {
            type: Number,
            required: true,
        },
        revisionNumber: {
            type: Number,
            required: true,
        },
        features: [String],
        sales: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

mongoose.models = {};
const Gig = mongoose.model('Gig', gigSchema);

export default Gig;
