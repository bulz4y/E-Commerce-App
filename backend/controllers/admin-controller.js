const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../models/product-model');
const HttpError = require('../models/error-model');

module.exports.updateProduct = async (req, res, next) => {
    const { id,title, price, quantity, description, parentCategory, childCategory } = req.body;
    const file = req.file;
    
    if(!req.userData.isAdmin) {
        return next(new HttpError('Not Authorized', 401));
    }

    let product;
    try {
        product = await Product.findOne({_id: new mongoose.Types.ObjectId(id)}).populate('categoryId');
    } catch(err) {
        return next(new HttpError("Something went wrong.", 500));
    }

    if(!product) {
        return next(new HttpError('Product not found', 422));
    }

    try {
        product.name = title;
        product.price = parseFloat(price);
        product.quantity = parseFloat(quantity);
        product.description = description;
        product.categoryId = new mongoose.Types.ObjectId(childCategory);
        product.image = file ? `/images/${file.filename}` : product.image;

        await product.save();

    } catch(err) {
        return next(new HttpError("Something went wrong.", 500));
    }

    try {
        await Product.populate(product, { path: 'categoryId' });
    } catch(err) {
        return next(new HttpError("Something went wrong.", 500));
    }


    res.status(200).json({
        product,
        message: 'Product Successfully Updated'
    });
};

module.exports.deleteProduct = async (req, res, next) => {
    const product = req.body;

    try {
        await Product.deleteOne({_id: new mongoose.Types.ObjectId(product._id)});
    } catch(err) {
        return next(new HttpError("Something Went Wrong.", 500));
    }

    const imagePath = path.join(__dirname, '..', product.image);

    fs.unlink(imagePath, (err) => {
        if(err) {
            console.log(err);
        }
    });

    res.status(200).json({
        message: 'Product Successfully Deleted'
    });
}

module.exports.createProduct = async (req, res, next) => {
    const { title, price, quantity, description, parentCategory, childCategory } = req.body;
    const file = req.file;

    const product = new Product({
        name: title,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        description,
        categoryId: new mongoose.Types.ObjectId(childCategory),
        image:`/images/${file.filename}`
    });

    try {
        await product.save();
    } catch(err) {
        return next(new HttpError('Something went wrong', 500));
    }



    res.json({
        message: 'Product Successfully Created'
    });
};