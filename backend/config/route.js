const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')

route.get('/', middleware.loggedInAlready, userController.homePage);
route.get('/logOut', userController.logOut);
route.get('/homepage/:id', userController.homePage);
route.get('/homepage', userController.homePage);
route.get('/login', middleware.checkLogIn, userController.loginPage)
route.get('/addQuestion/:id' , userController.addNew)
route.get('/question/:id', middleware.loggedInAlready, userController.commentPage );
route.get('/user/:id', userController.getUser);


route.post('/log-in', userController.logIn)
route.post('/signUp', userController.signUp);
route.post('/add-new/:id', userController.addQuestion)
route.post('/delete-question/:id', userController.deleteQuestion);
route.post('/delete-comment/:id', userController.deleteComment);
route.post('/update-question/:id', userController.updateQuestion)
route.post('/add-comment/:questionId', userController.addComment)
route.post('/user/:id', userController.updateUser)

module.exports = route;