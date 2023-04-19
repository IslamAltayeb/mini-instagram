const userModel = require("../models/userModel");
const questionModel = require('../models/questionModel')
const commentModel = require('../models/commentModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const homePage = (request, response) => {
    questionModel.find()
        .sort({ created_at: '-1' })
        .populate('user')
        .then(question=>{
            response.send({
                error: null,
                question: question,
            })
        })
        .catch(error => {
            console.log(error)
        })
}

const startPage = (request, response) => {
    response.send('index',{
        error: null,
    })
}

const loginPage = (req, res)=> {
    res.status(200).send("/homePage")
}

const logIn = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.send({
            error: 'email and password are required'
        })
    }else{
        let user = await userModel.findOne({email : req.body.email});
        if (!user) {
            res.send({
                error: 'User is not exist, please sign up first!'
            })
        }else{
            let correctPass = await bcrypt.compareSync(req.body.password, user.password)
            if (!correctPass) {
                res.send({
                    error: 'Password is not correct'
                })
            } else{
                let newToken = await jwt.sign({user}, 'user token')
                res.cookie('jwt', newToken, { httpOnly: true })
                res.send({"path": `/homePage`, "user": `${user._id}`})
            }
        }
    }

}          

const signUp = async (request, response) => {
    let existUser = await userModel.findOne({email: request.body.email})
    if (existUser){
        response.send({
            error: 'This email is already in use!'
        })
    } else {
        if (!request.body.email || !request.body.password){
            response.send({
                error: 'Email and password are required'
            })
        } else {
            var hashedPassword = await bcrypt.hashSync(request.body.password, 12)
            let newUserObj = {
                ...request.body,
                password: hashedPassword
            }
            let user = new userModel(newUserObj)
            user.save()
                .then ( async () => {
                    let newToken = await jwt.sign({user}, 'user token')
                    response.cookie('jwt', newToken, { httpOnly: true })
                    response.send({"path": `/homePage`, "user": `${user._id}`})
                })
                .catch ( error => {
                    throw error
                })
        }
    }
}

const logOut = (request, response) => {
    response.clearCookie('jwt');
    response.send('/')
}

const addNew = (req,res) =>{
    res.send({
        user : req.params.id
    })
};

const addQuestion = (request, response) => {
    let newQuestion = new questionModel(request.body);
            newQuestion.save()
                .then(() => {
                    response.send(`/homePage`)
                })
                .catch(error => {
                    console.log(error)
                })
}

const commentPage = (req, res) => {
    questionModel.findById(req.params.id)
    .populate('user')
        .then(result => {
            commentModel.find({question: result._id })
                .populate('user')
                .then( ( comments ) => {
                    res.send({
                        question: result,  
                        comments: comments         
                    }) 
                })
                .catch(err => {console.log(err)})       
        })
        .catch(err => {console.log(err)})
}
//delete function
const deleteQuestion = (req, res) => {
    questionModel.findByIdAndDelete(req.params.id)
    .then(()=> {
        res.send('/homePage')
    })
    .catch(err =>{ console.log(err)});    
}

const deleteComment = (req, res) =>{
    commentModel.findByIdAndDelete(req.params.id)  
        .populate('question')
        .then(result => {
            res.send(`/question/${result.question._id}`)
    })
    .catch(err =>{ console.log(err)}); 
}
    
//edit functions
const editQuestion =(req, res) =>{
    questionModel.findById(req.params.id)
        .then(result => {
            res.render('edit' , {
                question: result,
            })
        })
        .catch(err => console.log(err))
}

const updateQuestion = (req, res) =>{
    questionModel.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.send(`/question/${req.params.id}`)
        })
        .catch(err => console.log(err))
}

const addComment = (req, res) => {
    let userToken = req.cookies.jwt;
    let userId;
    let questionId = req.params.questionId
    jwt.verify(userToken, 'user token', async (err, result) => {
        if(err) {
            console.log(err)
        }
        userId = result.user._id 
    })
    let commentObj ={
        ...req.body,
        user: userId,
        question: questionId
    }
    let newComment = new commentModel(commentObj);
    newComment.save()
        .then(() => {
            res.send(`/question/${questionId}`)
        })
        .catch(error => {
            console.log(error)
        })
}
const getUser = (req, res) => {
    userModel.findById(req.params.id)
        .then(result=> {
            res.send({user: result})
        })
        .catch(err =>{ console.log(err)});
}
const updateUser = (req, res) =>{
    userModel.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.send(`/user/${req.params.id}`)
        })
        .catch(err => console.log(err))
}
const getAllUsers = (req, res) =>{
    userModel.find()
        .then(user => {
            res.send({user: user})
        })
        .catch(err => console.log(err))
}
module.exports = {
    homePage,
    logIn,
    signUp,
    logOut,
    startPage,
    addNew,
    addQuestion,
    commentPage,
    deleteQuestion,
    editQuestion,
    updateQuestion, 
    deleteComment,   
    addComment,
    loginPage,
    getUser,
    updateUser,
    getAllUsers
}