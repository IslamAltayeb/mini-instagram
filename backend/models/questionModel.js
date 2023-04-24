const mongoose = require('mongoose');
const moment = require('moment')

const questionSchema = mongoose.Schema({

    title :{
        type: String,
        required : true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    image :{
        type: String,
    },
    description:{
        type: String,
        required : true,
    },

    created_at: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
            return moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        }
    },

}, {timestamps: true})

module.exports = mongoose.model('question', questionSchema);