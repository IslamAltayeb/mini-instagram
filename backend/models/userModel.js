const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName :{
        type : String,
        required: true, 
        unique : true,       
    },

    email :{
        type : String,
        required : true,
        unique : true,
        lowercase: true,        
    },

    password :{
        type : String,
        required: true,
        minlength : [8, 'minimum is 8 characters'],        
    }
})

module.exports = mongoose.model('user', userSchema);