import Product from "../models/Product.js";
import { responSuccess } from "../utils/error.js";



export const  createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    try {
        const products = await newProduct.save();
        res.status(200).json(responSuccess({message:'Created Product!', data: products}));
    } catch (error) {
        next(error);
    }
}

export const getAllProducts =async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(responSuccess({message: 'Success Get Products', data: products}));
    } catch (error) {
        next(error);
    }
};