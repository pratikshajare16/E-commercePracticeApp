const express = require('express'); // calling package
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//import api file

const userRoutes = require('./API/routes/user')
const productRoutes = require('./API/routes/products');




const morgan = require('morgan') // It provides logging functionality to log information about incoming HTTP requests to your server.
app.use(morgan('dev')) //. The 'dev' parameter passed to morgan specifies the predefined log format,
app.use(cors());

app.use('/upload', express.static('upload')); // make upload folder public, without this line its private

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//When client and server are on 2 different ports so we have to set headers 
//CORS error handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type", "Accept", "Authorization");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

// Call api files

app.use('/users', userRoutes)
app.use('/products', productRoutes);
//Error handling if api not found
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
})

// next function is used to pass control to the next middleware function in the stack 
// Following kind of function are known as MiddleWare function   
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



module.exports = app;
