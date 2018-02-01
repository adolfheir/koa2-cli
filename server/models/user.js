const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email:String,
    createTime: Date
});

exports = module.exports = mongoose.model('user', userSchema);
