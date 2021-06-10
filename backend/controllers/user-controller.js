const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const User = require('../models/user-model');
const HttpError = require('../models/error-model');

module.exports.login = async (req, res, next) => {


 
    const { email, password } = req.body;


    let existingUser = null;

    try {
        existingUser = await User.findOne({email});
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }

    if(!existingUser) {
        return next(next(new HttpError('Invalid Credentials', 403)));
    }

    let isValidPassword = null;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }


    if(!isValidPassword) {
        return next(next(new HttpError('Invalid Credentials', 403)));
    }

 
    let token;

    try {
        token = await jwt.sign({id: existingUser._id, email: existingUser.email, isAdmin: existingUser.isAdmin}, process.env.JWT_SECRET);
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }

   
    res.status(200).send({
        id: existingUser._id,
        email: existingUser.email,
        token,
        isAdmin: existingUser.isAdmin
    });
};

module.exports.signup = async (req, res, next) => {


    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return next(new HttpError('Invalid input passed.', 422));
    }


    const { email, password } = req.body;


    let existingUser = null;

    try {
        existingUser = await User.findOne({email});
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }

    if(existingUser) {
        return next(new HttpError('User already exists.', 422))
    }

    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }

    const user = new User({
        email, 
        password: hashedPassword,
        favs: []
    });

    try {
        await user.save();
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }

    let token;

    try {
        token = jwt.sign({id: user._id, email: user.email, isAdmin: user._isAdmin}, process.env.JWT_SECRET);
    } catch(err) {
        return next(new HttpError('Something Went Wrong.', 500));
    }
    

    res.status(200).send({
        id: user._id,
        email: user.email,
        token,
        isAdmin: user.isAdmin
    });
};