import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { catchAsync } from '@/utils/catchAsync';
import errHandler from './errController';

const signToken = (id, isSeller) => {
    return jwt.sign({ id, isSeller }, process.env.JWT_KEY);
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id, user.isSeller);
    const serialised = serialize('accessToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
    });
    res.setHeader('Set-Cookie', serialised);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: user,
        },
    });
};

export const signUp = async (req, res) => {
    try {
        const user = await User.create(req.body);
        createSendToken(user, 201, res);
    } catch (error) {
        errHandler(error, req, res);
    }
};

export async function logIn(req, res) {
    try {
        const { userName, password } = req.body;
        if (!userName || !password)
            res.status(400).json({
                status: 'fail',
                message: 'please enter an email and password',
            });
        const user = await User.findOne({ userName });
        if (!user) {
            res.status(400).json({
                status: 'fail',
                message: 'no user found',
            });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            res.status(400).json({
                status: 'fail',
                message: 'incorrect password',
            });
        }
        createSendToken(user, 201, res);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
}

export async function logOut(req, res) {
    const token = req.cookies.accessToken;
    if (!token)
        res.status(400).json({
            message: 'please log in first',
        });
    const serialised = serialize('accessToken', null, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
    });
    res.setHeader('Set-Cookie', serialised);
    res.status(200).json({
        status: 'success',
        message: 'you are now logged out',
    });
}
