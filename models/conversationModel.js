import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        buyerId: {
            type: String,
            required: true,
        },
        sellerId: {
            type: String,
            required: true,
        },
        readByBuyer: {
            type: Boolean,
            required: true,
        },
        readBySeller: {
            type: Boolean,
            required: true,
        },
        lastMessage: String,
    },
    {
        timestamps: true,
    }
);

mongoose.models = {};
const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
