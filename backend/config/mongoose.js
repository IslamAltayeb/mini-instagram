const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://impactProject:islam-kubrak@cluster0.e6a5h10.mongodb.net/?retryWrites=true&w=majority')
.then(res =>{console.log('DB is connected')})
.catch(err => {console.log(err)});