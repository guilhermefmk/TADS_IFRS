import express from 'express';
import { getHome, healthCheck } from '../controllers/homeController.js';
import { isAuth } from '../middlewares/is-auth.js';

const router = express.Router();

router.get('/healthcheck', healthCheck);
router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', isAuth, getHome);

export default router;
