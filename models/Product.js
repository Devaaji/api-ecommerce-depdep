import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
    },
    price:{
        type: Number,
    },
    rating: {
        type: Number,
        default: 0,
    },
    stock:{
        type: Number,
    },
    descProduct: {
        type: String,
    }
});

export default mongoose.model('Product', ProductSchema)