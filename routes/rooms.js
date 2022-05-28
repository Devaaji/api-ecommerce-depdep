import express from 'express';
import { createRoom, deleteRoom, getIdRoom, getRooms, updateRoom } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post('/:hotelid', verifyAdmin, createRoom);
//UPDATE
router.put('/:id', verifyAdmin, updateRoom);
//DELETE
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);
//GET  
router.get('/:id', verifyAdmin, getIdRoom);
//GET ALL
router.get('/', verifyAdmin, getRooms);


export default router;