const mongoose = require('mongoose');
const crypto = require('crypto');
const ListSchema = new mongoose.Schema({
    title:{
        type: String, 
        trim:true,
        minlength:3
    },
    password:String
});
const List = mongoose.model('List',ListSchema);
module.exports = List ;