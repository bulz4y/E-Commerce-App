const mongoose = require('mongoose');

const Category = require('../models/category-model');
const Product = require('../models/product-model');
const User = require('../models/user-model');
const Order = require('../models/orders-model');
const HttpError = require('../models/error-model');


module.exports.getOrders = async (req, res, next) => {
    const data = req.body;


    let orders = [];
    try {
        orders = await Order.find({userId: new mongoose.Types.ObjectId(data.id)});
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }




    return res.status(200).json({
        orders
    });

}

module.exports.createOrder = async (req, res, next) => {
    
    const {items, total, user } = req.body;


    const order = new Order({
        userId: new mongoose.Types.ObjectId(user.user.id),
        items,
        total
    });

    try {
        await order.save();
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }

    res.status(201).json({
        order
    });
};

module.exports.getFavorite = async (req, res, next) => {
    
    const id = req.params.id;

    let user = [];

    try {
        user = await User.findOne({_id: new mongoose.Types.ObjectId(id)}).populate('favs');
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }


    res.status(200).json({
        favs: user.favs
    });
}

module.exports.setFavorite = async (req, res, next) => {
    
    const { id, userId } = req.body;


    let user;

    try {
        user = await User.findOne({_id: new mongoose.Types.ObjectId(userId)}).populate('favs');
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }

    if(!user) {
        return next(new HttpError('Something went wrong.', 500));
    }


    let contains = false;
   
    try {
        
        // Delete if already favorite
        for(let i = 0; i < user.favs.length; i++) {
            if(id === user.favs[i]._id.toString()) {
                contains = true;
                console.log('contains');
                user.favs.pull({_id: new mongoose.Types.ObjectId(id)});
                break;
            }
        }

        // Add new favorite
        if(!contains) {
            user.favs.push(new mongoose.Types.ObjectId(id));
        }
        
       await user.save();

       user = await User.populate(user, { path: 'favs', model: 'product' });

    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }


    res.status(200).json({
        favs: user.favs
    });
}

module.exports.getSubcategory = async (req, res, next) => {
    const id = req.params.id;

   
    
    let subcategory;

    try {
        subcategory = await Category.find({parent: new mongoose.Types.ObjectId(id)});
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }

    if(!subcategory) {
        return next(new HttpError('No Subcategories found.', 404));
    }

    res.status(200).json({
        subcategory
    });
}

module.exports.searchCategory = async (req, res, next) => {
    const category = req.body.category;

    const { types, price } = req.body.filters;

    const { items, skip } = req.body.page;

    // Filters
    let filters = {};
    if(types.length > 0) {
        try {
            if(category) {
                filters.categoryId = { $in: await Category.find({ parent: new mongoose.Types.ObjectId(category._id), name: { $in: types } }) }
            }else {
                filters.categoryId = { $in: await Category.find({ name: { $in: types } }) }
            }
        } catch(err) {
            return next(new HttpError('Something went wrong.', 500));
        }    
       
    } else {
        if(category) {
            filters.categoryId = { $in: await Category.find({ parent: new mongoose.Types.ObjectId(category._id)}) }
        }else {
            filters.categoryId = { $in: await Category.find({parent: { $ne: null } }) }
        }
    }


    if(price.length > 0) {
        if(price[1]) {
            filters.price = { $gte: parseFloat(price[0]), $lt: parseFloat(price[1]) };
        } else {
            filters.price = { $gte: parseFloat(price[0]) };
        }
        
    }


    try {
        products = await Product.find({...filters}).populate('categoryId').skip(skip).limit(items);
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }

    // Fetch distinct product types
    let productTypes;

    try {
    
        if(category) {
            productTypes = await Category.find({parent: mongoose.Types.ObjectId(category._id)}).distinct('name');
        } else {
            productTypes = await Category.find({parent: {$ne: null}}).distinct('name');
        }
        
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }



    res.status(200).json({
        products,
        productTypes
    });

}

module.exports.getSingleProduct = async (req, res, next) => {
    const id = req.params.id;

    

    let product;

    try {
        product = await Product.findOne({_id: new mongoose.Types.ObjectId(id)}).populate('categoryId');
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }


    if(!product) {
        return next(new HttpError('Product not found.', 404));
    }

    res.status(200).json({
        product
    });
}

module.exports.getCategories = async (req, res, next) => {
    let categories;
    try {
        categories = await Category.find({parent: null});
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }


    return res.status(200).json({
        categories
    });

};

module.exports.getProductsHome = async (req, res, next) => {
    let bestSeller;
    let newest;

    try {
        bestSeller = await Product.find({}).limit(8);
        newest = await Product.find().limit(8).sort('-createdAt');
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }


    return res.status(200).json({
        bestSeller,
        newest
    });
}