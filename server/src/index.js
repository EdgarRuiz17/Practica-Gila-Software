const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const app = express();

//importing routes
const customerRoutes = require('./routes/products');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(myConnection(mysql, {
    host: 'localhost',
    database: 'gila_practice',
    user: 'root',
    password: ''
}, 'single'));

// routes

app.use('/api/products', customerRoutes);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});