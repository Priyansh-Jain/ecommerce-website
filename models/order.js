var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/test_Auth');
 
autoIncrement.initialize(connection);

var OrderSchema = new mongoose.Schema({
    UserID:{
        type: Number,
        required: true,
    },
    ProductID: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
    }
}, {
    versionKey: false 
});

OrderSchema.plugin(autoIncrement.plugin, 'order');
var order = mongoose.model('order', OrderSchema);

module.exports = order;

