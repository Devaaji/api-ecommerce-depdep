import express from 'express';
import { deleteUser, getAllUsers, getIdUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

//TESTING MIDDLEWARE
router.get('/checkout', verifyToken, (req, res, next) => {
    res.send("Your are Logged in!");
})

router.get('/checkout/:id', verifyUser, (req, res, next) => {
    res.send("Hello User, Your are Logged in and Delete!");
})

router.get('/checkout/:id', verifyAdmin, (req, res, next) => {
    res.send("Hello Admin, Your are Logged in and Delete!");
})


//UPDATE
router.put('/:id', updateUser);
//DELETE
router.delete('/:id', deleteUser);
//GET  
router.get('/:id', getIdUser);
//GET ALL
router.get('/', getAllUsers);


export default router;