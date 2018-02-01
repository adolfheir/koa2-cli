const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    art_id: String,//codeID
    content: String,//评论内容
    replied_time:Date,//评论时间
    created_ID:Date, //评论人id
    // replied_time
    replies:[
      {
        content: String,//回复内容
        repliedTo_ID:string, //回复被评论人id
        created_ID:string //回复人id
      }
    ]//回复列
});

exports = module.exports = mongoose.model('comment', userSchema);