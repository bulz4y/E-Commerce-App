const jwt = require('jsonwebtoken');

const HttpError = require('../models/error-model');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];  // Authorization: 'Bearer TOKEN';
        
        if(!token) {
            throw new HttpError('Authentication failed.');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        
        req.userData = decodedToken

        next();


    } catch(err) {
        return next(new HttpError('Authentication failed.', 403));
    }
    

   


};