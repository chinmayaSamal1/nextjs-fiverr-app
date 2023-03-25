import jwt from 'jsonwebtoken';

export async function verifytoken(req, res) {
    const token = req.cookies.accessToken;
    if (!token)
        res.status(403).json({
            status: 'failed',
            message: 'unauthorized access',
        });
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err)
            res.status(403).json({
                status: 'failed',
                message: 'Not valid user',
            });
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
    });
}
