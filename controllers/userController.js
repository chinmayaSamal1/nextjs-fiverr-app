import User from '../models/userModel';

export async function getAllUser(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            users,
        });
    } catch (error) {
        res.status(405).json({
            status: 'failed',
        });
    }
}

export async function getUser(req, res) {
    try {
        const user = await User.findById(req.query.id);
        res.status(200).json({
            status: 'success',
            user,
        });
    } catch (error) {
        res.status(405).json({
            status: 'failed',
        });
    }
}

export async function updateUser(req, res) {
    try {
        const user = User.findById(req.query.id);
        if (req.userId !== user._id.toString())
            return res.status(403).json({ status: 'failed', message: 'you are not allowed' });
        if (!user)
            return res.status(405).json({
                status: 'failed',
                message: 'no user',
            });
        const updatedUser = await User.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
        });
        res.status(200).json({
            status: 'success',
            updatedUser,
        });
    } catch (error) {
        res.status(405).json({
            status: 'failed',
            error,
        });
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.findById(req.query.id);
        if (req.userId !== user._id.toString())
            return res.status(403).json({ status: 'failed', message: 'you are not allowed' });
        if (!user)
            return res.status(405).json({
                status: 'failed',
                message: 'no user',
            });
        await User.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        res.status(405).json({
            status: 'failed',
            error,
        });
    }
}
