const mongoose = require('mongoose');
const moment = require("moment");
const dateType = new Date().toLocaleString();
console.log(dateType);

const userSchema = mongoose.Schema({
    userName :{
        type : String,
        required: true, 
        unique : true,       
    },
    image :{
        type: String,
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase: true,
    },
    firstName :{
        type : String,
    },
    lastName :{
        type : String,
    },
    about :{
        type : String,
    },
    password :{
        type : String,
        required: true,
        minlength : [8, 'minimum is 8 characters'],        
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
            return moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        }
    },
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema);