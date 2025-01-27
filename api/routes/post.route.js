import express from 'express';

import {verifyToken} from '../utils/verifyToken.js';
import { create, getposts, deletePost } from '../constrollers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);

export default router;
