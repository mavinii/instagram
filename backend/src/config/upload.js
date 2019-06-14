const multer = ('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        // Send the archive go 
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb){
            cb(null, file.originalname); // Original name the archivo
        }
    })
};