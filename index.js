import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotels.js';
import productRoute from './routes/products.js';
import userRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import multer from 'multer';
import cors from 'cors';



const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to Mongoose')
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!');
});
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!');
});

//MIDDLEWARE
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//TES api
app.get('/', (req, res) => {
    res.send('Hello World!');
})

//API FUNCTIONS
app.use('/api/rooms', roomsRoute);
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        data: {
            message: errorMessage,
        }
    })
});

app.listen(process.env.PORT, () => {
    connect()
    console.log(`Conneted on port ${process.env.PORT}`)
});