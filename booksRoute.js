import express from 'express';
const router = express.Router();
import { createBook, getAllBooks, getById, updateOne, deleteOne } from '../controllers/booksController.js';


router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getById);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

export default router;



