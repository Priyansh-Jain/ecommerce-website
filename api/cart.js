var express = require('express');
const cart  = require('../models/cart');
const product = require('../models/Product');
var router = express.Router();

router.post('/', (req, res, next) => {

    if (req.body.ProductID ) {

        let newCart = new cart(req.body);
        console.log(newcart);
        newCart.save((err, cart) => {
            if (err) {
                res.send(err);
            }
            res.json(cart);
        });
    }
});


router.get('/', (req, res) => {

    cart.find({UserId: req.session.userId},{ProductID:1 , _id:0},(err, cart) => {
        if (err) {
            res.send(err);
        }
        let product_id_list = [];

        for(var i=0;i<cart.length;i++)
        {
            product_id_list.push(cart[i].ProductID);
  
        }
        product.find( {'_id': {$in:product_id_list}}, (err, products) => {
            if (err) {
                res.send(err);
            }
            console.log(products);
            res.render('cart.ejs', {
                products
            })
        })
        
    })
});


module.exports = router;