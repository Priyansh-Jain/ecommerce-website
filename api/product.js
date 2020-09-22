var express = require('express');
const product = require('../models/Product');
var router = express.Router();


router.post('/', (req, res, next) => {
    if (req.body.name && req.body.description && req.body.price) {

        if (req.body.price < 0) {
            var err = new Error('price is not correct');
            err.status = 403;
            res.send("price is not correct");
            return next(err);
        }
        else {

            let newProduct = new product(req.body);

            newProduct.save((err, product) => {
                if (err) {
                    res.send(err);
                }height="400"
                res.json(product);
            });

        }

    }
})

router.get('/', (req, res) => {
    product.find({}, (err, Product) => {
        if (err) {
            res.send(err);
        }
        res.render('ec-product',{
            Product
        })
    })


})

router.get('/:_id',(req, res) => {
    product.findById(req.params._id, (err, Product) => {
        if (err) {
            res.send(err);
        }
        res.json(Product);
    })
})

router.put('/:_id',(req, res) => {
    product.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, useFindAndModify: false }, (err, Product) => {
        if (err) {
            res.send(err);
        }
        res.json(Product);
    })
})
    
router.delete('/:_id',(req, res) => {
    product.deleteOne({ _id: req.params._id}, (err, Product) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'successfully deleted product' });
    })
})
    

module.exports = router;