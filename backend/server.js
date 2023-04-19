const express = require('express');
require('./config/mongoose');
const app = express();
const multer = require('multer');
const cors = require('cors');
const upload = multer({dest: 'uploads/'})
const route = require('./config/route');
const fs = require("fs")
const cookieParser = require("cookie-parser");
const userModel = require("./models/userModel");


app.set('view engine', 'ejs');
app.use('/static', express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(route);

app.post("/uploadFile/:id", upload.single("avatar"), (req,res) =>{
    console.log(req.file)
    let fileType = req.file.mimetype.split("/")[1];
    let newFileName = `${req.file.filename}.${fileType}`;
    fs.rename(`uploads/${req.file.filename}`, `uploads/${newFileName}`, function(){
        let image = {
            image: `/static/${newFileName}`
        };
        userModel.findByIdAndUpdate(req.params.id, image)
            .then(() => {
                res.send(`/user/${req.params.id}`)
            })
            .catch(err => console.log(err))
    })

})
let PORT = 2100;

app.listen(PORT, () => console.log(`The Timeline is on ${PORT}`));
