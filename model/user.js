const mongoose = require("mongoose"); 
const userSchema =  new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    username :{
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
},{
    timestamps : true   //adds two more fields in the schema 'createdAt , updatedAt'
});

const user = mongoose.model('User', userSchema);
module.exports = user;