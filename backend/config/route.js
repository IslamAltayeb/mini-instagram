const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')

// route.get('/', userController.startPage);


//log-in function

route.get('/', middleware.loggedInAlready, userController.homePage);

route.get('/logOut', userController.logOut);
route.get('/homepage/:id', userController.homePage);

route.get('/homepage', userController.homePage);

//log-in function
route.get('/login', middleware.checkLogIn, userController.loginPage)
route.post('/log-in', userController.logIn)

//add new file route functions
// route.get('/addQuestion' , userController.addNew)

route.post('/signUp', userController.signUp);
route.post('/log-in', userController.logIn)
route.post('/add-new/:id', userController.addQuestion)
route.get('/addQuestion/:id' , userController.addNew)

//get comment page
route.get('/question/:id', middleware.loggedInAlready, userController.commentPage );

// delete question
route.post('/delete-question/:id', userController.deleteQuestion);
route.post('/delete-comment/:id', userController.deleteComment);

//route editing
route.get('/edit/:id', userController.editQuestion);
route.post('/update-question/:id', userController.updateQuestion)

//add a comment function
route.post('/add-comment/:questionId', userController.addComment)
module.exports = route;