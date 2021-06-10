
const setupDB = require('./setupDB');
const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');



const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');
const adminRoutes = require('./routes/admin-routes');
const newsletterRoutes = require('./routes/newsletter-routes');

// Setup env
require('dotenv').config();


const app = express();



// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));


app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/newsletter', newsletterRoutes);


// Error Handler
app.use((error, req, res, next) => {

    if(req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }

    res.status(error.statusCode || 500).json({
        error: error.message
    });
});


mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => {

        // setupDB();
        app.listen(process.env.PORT || 5000);
    })
    .catch((err) => {
        console.log(err);
    })

