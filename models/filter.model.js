var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    filter_type: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Filter', FilterSchema);
