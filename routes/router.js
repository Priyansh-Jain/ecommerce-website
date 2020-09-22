var express = require('express');
var User = require('../models/user');
const product = require('../models/Product');
var router = express.Router();


// GET route for reading data
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/public/index.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/product');
            }
        });

    }
    else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/product');
            }
        });
    }
    else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})



// GET route after registering
router.get('/', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    // return res.redirect("/product.html");
                      
                    // res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;



// /products
//  returns list of products

// /addProduct
//  -- product ID,  name, description,  Price
//  returns success/failure

// /products/payment
//  -- email, product Id, Order ID
//     Order
//  reruns success failure

// /products/addToCart
//     Cart
//   -- email, product Id

// /Cart
//     user id (email)
//    returns list of cart of that user ID (email)



//    cart  
//     email, product id

//     select * from Cart where email = ""