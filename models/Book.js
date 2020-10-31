const mongoose = require('mongoose');
const schema = mongoose.Schema();

//Creating Schema

const BookSchema = new mongoose.Schema({
    bookid:{type:String},
    title:{type: String},
    author:{type:Array},
    publisher:{type:String},
    published_date:{type:Date},
    summary:{type:String},
    thumbnail:{type:String},
    count:{type:Number,default:0},
    created:{
        type:Date,
        default:Date.now
    }

});

module.exports = Book = mongoose.model('Books', BookSchema);