var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/router');
var routesProduct = require('./api/product');
var routesOrder = require('./api/order');
var routesCart = require('./api/cart');



// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Template engine connect
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost/test_Auth');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


// serve static files from template
app.use(express.static(__dirname + '/public'));


//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));


// include routes
app.use('/', routes);
app.use('/product',routesProduct);
app.use('/order',routesOrder);
app.use('/cart',routesCart);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


// listen on port 4000
app.listen(4000, function () {
    console.log('Express app listening on port 4000');
});