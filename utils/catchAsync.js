import { errHandler } from '../controllers/errController';

export function catchAsync(fn) {
    return (req, res, next) => fn(req, res, next).catch((err)=>errHandler(err, req, res, next));
}
