import express from 'express';
import { createCategory, getCategories, shareCategory, getSharedCategories, getAllSharedCategories } from '../controllers/categoryController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { categorySchema, shareCategorySchema } from '../utils/validationSchema.js';

const router = express.Router();

router.use(authenticate);

router.post('/', validate(categorySchema), createCategory);
router.get('/', getCategories);
router.post('/:id/share', authorize('category'), validate(shareCategorySchema), shareCategory);
router.get('/shared', getSharedCategories);
router.get('/all-shared', getAllSharedCategories);


export default router;

