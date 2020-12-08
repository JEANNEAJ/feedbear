import express from 'express';
import { checkLoggedIn } from '../controllers/session.js';

const router = express.Router();

router.get('/session', checkLoggedIn);

export default router;