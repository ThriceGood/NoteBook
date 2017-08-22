var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    colour: {
        type: String,
        required: true
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);
