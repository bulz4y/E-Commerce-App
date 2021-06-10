const express = require('express');

const router = express.Router();

const productController = require('../controllers/product-controller');

const isAuth = require('../middlewares/auth');

router.get('/categories', productController.getCategories);

router.get('/home', productController.getProductsHome);

router.post('/searchCategory', productController.searchCategory);

router.get('/:id', productController.getSingleProduct);

router.get('/subcategory/:id', productController.getSubcategory);

router.post('/favorite', isAuth, productController.setFavorite);

router.get('/favorite/:id', isAuth, productController.getFavorite);

router.post('/createOrder', productController.createOrder);

router.post('/getOrders', isAuth, productController.getOrders);



module.exports = router;