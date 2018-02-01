const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    que_id: Number,//问题id
    code: String,//代码体
    start_time:Date,//开始时间
    end_time:Date,//结束时间,
    type:String,
    score:String,
    user:String
    // fileStream:

});

exports = module.exports = mongoose.model('code', codeSchema);