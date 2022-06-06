import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError, responSuccess } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })
        const cekEmail = await User.findOne({ email: req.body.email });
        if (cekEmail) return next(createError(403, 'Email was already exists!'));
        const cekUsername = await User.findOne({ username: req.body.username });
        if (cekUsername) return next(createError(403, 'Username was already exists!'));

        await newUser.save();
        res.status(200).send({ status: 200, error: false, data: { message: "Success registered!" } });

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const expiredToken = 86400;
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'Wrong email or passsword!'));

    const isPasswordCorrrect = await bcrypt.compare(req.body.password, user.password);
    if (user)
        if (!isPasswordCorrrect) return next(createError(404, 'Wrong email or passsword!'));

    const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiredToken
    });

    res.status(200).send({ status: 200, error: false, data: { messages: "Login Sucess!", token: token, expiresIn: expiredToken, email: user.email } })
    try {
    } catch (error) {
        next(error);
    }
}

export const infoUser = async (req, res, next) => {
    
    try {
        const getUser = await User.findOne({email: req.query.email});
        console.log(req.query.email)
        
        res.status(200).json(responSuccess({
            data: [getUser.email]
        }))
    } catch (error) {
        next(error)
    }
}
