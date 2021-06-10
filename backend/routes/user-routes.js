const express = require('express');

const { check } = require('express-validator');

const router = express.Router();

const userController = require('../controllers/user-controller');

router.post('/login', userController.login);

router.post('/signup', [
    check('email').trim().isEmail(),
    check('password').trim().isLength({min: 5})
        .custom((value, { req }) => {
            if(value !== req.body.confirmPassword.trim()) {
                throw new HttpError('Passwords must match', 400);
            } else {
                return value;
            }
        })
    
],
userController.signup);

module.exports = router;