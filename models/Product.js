var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/test_Auth');
 
autoIncrement.initialize(connection);

var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false 
});


ProductSchema.plugin(autoIncrement.plugin, 'product');
var product = mongoose.model('product', ProductSchema);


module.exports = product;

