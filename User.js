const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  author: String,
  //genre: String,
  //readDate: Date,
  //stars: Number,
  //review: String,
  //coverImageUrl: String,
});

const userSchema = new Schema({
    username: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        minlength:6,
        required:true
    },
    role: {
        type:String,
        default:"Basic",
        required:true
    },
    books: [bookSchema]
},{timestamps:true})

module.exports = mongoose.model('User', userSchema)