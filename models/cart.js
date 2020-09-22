var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/test_Auth');
 
autoIncrement.initialize(connection);

var CartSchema = new mongoose.Schema({
    UserId:{
        type: Number,
        required: true,
    },
    ProductID: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false 
});

CartSchema.plugin(autoIncrement.plugin, 'cart');
var cart = mongoose.model('cart', CartSchema);
module.exports = cart;
