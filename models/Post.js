const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    level: {
        type: String,
        required: true,
        default:''
   },
   lecturer: {
       type: String,
       required: true,
       default:''
    },
    course: {
        type: String,
       required: true,
       default:''
    },
});


module.exports = Post = mongoose.model('post', PostSchema);