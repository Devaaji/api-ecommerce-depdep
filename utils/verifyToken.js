import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) return next(createError(403, "Token is not valid, Please try again!"))
            req.user = user;
            next()
        });
    }else{
        return next(createError(401, 'Your not authenticated!'))
    }
   

};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (error)
                return next(createError(401, 'Your not authenticated!'))
        }
    })
}

export const verifyInfoUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.email === req.params.email) {
            next()
        } else {
            if (error)
                return next(createError(401, 'Your not authenticated!'))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            if (error)
                return next(createError(401, 'Your not authenticated!'))
        }
    })
}