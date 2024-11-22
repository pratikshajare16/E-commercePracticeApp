const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../Controller/products')
//Image or file upload 
// File storage destination
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        const currentDate = new Date().toLocaleDateString().replace(/\//g, '-'); // Replace '/' with '-'
        const uniqueFilename = currentDate + '-' + Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename);
    }
})
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);

    } else {
        //rejecting file
        cb(new Error('OOPS!,File Format Not Correct, try again with jpeg and png file format'), false);

    }
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // to upload file upto 5mb
    fileFilter: fileFilter
})

//middleware functions
router.get('/', productController.get_all_products);

router.post('/', upload.single('productImage'), productController.create_product);

router.post('/:name', productController.get_product_by_name);

router.patch('/:productId', upload.single('productImage'), productController.update_product);

router.delete('/:productId', productController.delete_product);

module.exports = router;