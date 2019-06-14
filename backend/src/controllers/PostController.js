const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    
    // Return all ordered posts to database
    async index(req, res){
        const post = await Post.find().sort('-createdAt');

        return res.json(posts);
    },
    
    // Receive archivo dates
    async store(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;
        
        // Redirect the image 500px, jpg, 70%
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        // Delet the original archivo    
        fs.unlinkSync(req.file.path);
        
        // Save all dates in database
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post);    

        return res.json(post);
    }
};