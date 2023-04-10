const jwt = require('jsonwebtoken');

const loggedInAlready = (req, res ,next) =>{
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'user token', async (err, result) => {
            if(err) {
                console.log(err)
            }
            if(result){
                res.locals.user = result.user ? result.user : result.newUser;
            } else {
                res.locals.user = false
            }

        })
        next()
    }else{
        res.redirect('/login')
    }
}


const checkLogIn = (req, res ,next) =>{
    const token = req.cookies.jwt
    if (token) {
        res.redirect('/')
    }else{
        next();
    }
}
module.exports = {
    loggedInAlready,
    checkLogIn,
}