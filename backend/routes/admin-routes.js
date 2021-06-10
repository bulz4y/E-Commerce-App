const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin-controller');

const fileUpload = require('../middlewares/file');

const isAuth = require('../middlewares/auth');

router.post('/create', isAuth,fileUpload.single('imageFile'), adminController.createProduct);

router.delete('/deleteProduct', isAuth,  adminController.deleteProduct);

router.patch('/updateProduct', isAuth, fileUpload.single('imageFile'), adminController.updateProduct);


module.exports = router;