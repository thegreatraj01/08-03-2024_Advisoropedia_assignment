import express from 'express';
import { signup, getpost } from '../Controlar/UserControllar.js';
const router = express.Router(); // Capital "R" for Router
import protect from '../milldeware/AuthUser.js';

router.post('/signup', signup);
router.get('/post', protect, getpost)
// router.post('/login', login);


export default router;