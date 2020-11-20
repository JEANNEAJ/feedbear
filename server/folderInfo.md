## Controllers
```
 import Mongoose from 'mongoose';
 import PostMessage from '../models/postMessage.js';
```
try catch functions for accessing mongoose API<br />
i.e., getPosts, createPost, updatePost


## Models
```
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	title: String,
	likeCount: {
		type: Number,
		default: 0
	}
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
```
where you specify the data structure<br />
JSON format<br />
paramenter needs to specify data type, but can also specify default values


## Routes
```
 import express from 'express';
 import { getPosts, createPost, updatePost } from '../controllers/posts.js';

 const router = express.Router();
 
 router.get('/', getPosts);
 router.post('/', createPost);
 router.patch('/:id', updatePost)
 
 export default router;
```