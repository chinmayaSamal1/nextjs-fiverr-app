import Conversation from '@/models/conversationModel';
import errHandler from './errController';

export async function createConversation(req, res) {
    try {
        const newConversation = new Conversation({
            id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
            sellerId: req.isSeller ? req.userId : req.body.to,
            buyerId: req.isSeller ? req.body.to : req.userId,
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
        });

        const savedConversation = await newConversation.save();
        res.status(201).send(savedConversation);
    } catch (error) {
        errHandler(error, req, res);
    }
}

export async function updateConversation(req, res) {
    try {
        const updatedConversation = await Conversation.findOneAndUpdate(
            { id: req.query.id },
            {
                $set: {
                    readByBuyer: req.isSeller,
                    readBySeller: !req.isSeller,
                },
            },
            {
                new: true,
            }
        );

        res.status(200).send(updatedConversation);
    } catch (error) {
        errHandler(error, req, res);
    }
}

export async function getSingleConversation(req, res) {
    try {
        const conversation = await Conversation.findOne({ id: req.query.id });

        res.status(200).send(conversation);
    } catch (error) {
        errHandler(error, req, res);
    }
}

export async function getConversation(req, res) {
    try {
        const conversation = await Conversation.find(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId });
        res.status(200).send(conversation);
    } catch (error) {
        errHandler(error, req, res);
    }
}
