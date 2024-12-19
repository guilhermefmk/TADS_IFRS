import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { todoSchema } from '../utils/validationSchema.js';

const router = express.Router();

router.use(authenticate);

router.post('/', validate(todoSchema), createTodo);
router.get('/', getTodos);
router.put('/:id', authorize('todo'), updateTodo);
router.delete('/:id', authorize('todo'), deleteTodo);

export default router;

