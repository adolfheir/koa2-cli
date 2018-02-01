const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qesSchema = new Schema({
    title:String,//标题
    content: String,//内容
    start_time:Date,//开始时间
    valid_time:String,//有效时间
    end_time:Date,//结束时间
});

exports = module.exports = mongoose.model('question', qesSchema);