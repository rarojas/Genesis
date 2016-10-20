var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Tanda', new Schema({
    name: String,
    mount: Number,
    startDate: Date,
    period: {type: String, enum: ['Daily', 'Week', 'Month'], default : 'Month'},
    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    users    : [{ type: Schema.Types.ObjectId, ref: 'User' }]
}));
