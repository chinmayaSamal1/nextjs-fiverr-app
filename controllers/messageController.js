import errHandler from './errController';
import Message from '@/models/messageModel';
import Conversation from '@/models/conversationModel';

export async function getMessages(req, res) {
    try {
        const messages = await Message.find({ conversationId: req.query.id });
        res.status(200).send(messages);
    } catch (error) {
        errHandler(error, req, res);
    }
}
export async function createMessage(req, res) {
    try {
        const newMessage = new Message({
            conversationId: req.body.conversationId,
            userId: req.userId,
            desc: req.body.desc,
        });
        const savedMessage = await newMessage.save();
        await Conversation.findOneAndUpdate(
            { id: req.body.conversationId },
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.desc,
                },
            },
            { new: true }
        );

        res.status(201).send(savedMessage);
    } catch (error) {
        errHandler(error, req, res);
    }
}
