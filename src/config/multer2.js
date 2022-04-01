const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('fastify-multer');



// create cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'fastify-gallery',
        allowedFormats: [ 'jpg', 'png' ],
        transformation: [ { width: 800, height: 800, crop: 'limit' } ]
    }
});

module.exports= storage;