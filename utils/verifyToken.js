import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader !== undefined) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            console.log(user)
            if(error) {
                return res.status(403).json({
                    status: false,
                    code: 403,
                    message: "Token is not valid, Please try again!"
                })
            }
            req.user = user;
            next()
        });
    }else{
        return res.status(401).json({
            status: false,
            code: 401,
            message: "Your not authenticated!"
        })
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
        if (req.user.email === req.query.email) {
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