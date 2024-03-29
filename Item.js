const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    id: {
        type:String,
        required:true
    },
    food: {
        type:String,
        required:true
    },
    opinion: {
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Item', itemSchema)