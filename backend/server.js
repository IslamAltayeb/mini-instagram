const express = require('express');
require('./config/mongoose');
const app = express();
const route = require('./config/route');
const cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(route);

let PORT = 2100;

app.listen(PORT, () => console.log(`The Timeline is on ${PORT}`));
