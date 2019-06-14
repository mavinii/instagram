const express = require('express');
const multer = require('multer'); // Using to upload the posts
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index); // Retorn all posts to feed
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/post/:id/like', LikeController.store); // Routes for likes

module.exports = routes;