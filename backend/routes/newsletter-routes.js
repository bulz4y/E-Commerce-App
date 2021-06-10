const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const Newsletter = require('../models/newsletter-model');

const HttpError = require('../models/error-model');


router.post('/', check('email').trim().isEmail(), async (req, res, next) => {
    const email = req.body.email;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Email.', 400));
    }

    let emailExists;

    try {
        emailExists = await Newsletter.findOne({email});
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }

    if(emailExists) {
        return next(new HttpError("Email already signed up.", 422));
    }

    const newsletter = new Newsletter({email});

    try {
        await newsletter.save();
    } catch(err) {
        return next(new HttpError('Something went wrong.', 500));
    }

    res.status(200).json({
        message: "Signed Up For Newsletter"
    });
});

module.exports = router;