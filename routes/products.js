import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/', createProduct);
router.get('/', getAllProducts);


export default router;