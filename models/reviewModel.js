import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        gigId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        stars: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5],
        },
        desc: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
mongoose.models = {};
const Reviews = mongoose.model('Reviews', reviewSchema);

export default Reviews;
