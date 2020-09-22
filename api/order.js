var express = require('express');
const order = require('../models/order');
var router = express.Router();


router.post('/', (req, res, next) => {
    if (req.body.UserID && req.body.ProductID && req.body.status) {

        let newOrder = new order(req.body);

        newOrder.save((err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }
});


router.get('/:UserID', (req, res) => {
    order.findById(req.params.UserID, (err, Order) => {
        if (err) {
            res.send(err);
        }
        res.json(Order);
    })
});


module.exports = router;