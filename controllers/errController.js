import AppError from '@/utils/AppError';

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.message.match(/(["'])(\\?.)*\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProduction = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });

        //Programming or other unknown error: don't leak error details
    } else {
        //<1> Log error
        console.error('Error 🏴‍☠️', err);
        //<2> Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
};
export default function errHandler(err, req, res) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.name === 'castError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    sendErrorProduction(err, res);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    res.status(err.code).json({
        message: err.message,
    });
}
