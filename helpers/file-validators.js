const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // Validate type of file
    if (file.mimetype === 'application/json') {
        cb(null, true);
    } else {
        cb(new Error('type of file not supported, Must be JSON'), false);
    }
}

const upload = multer({ storage: storage, fileFilter });

module.exports = { upload }