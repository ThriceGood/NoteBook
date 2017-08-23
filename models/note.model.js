var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    tag: {
        type: String
    },
    content: {
        type: String
    },
    _creator : {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
},
{
  timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
