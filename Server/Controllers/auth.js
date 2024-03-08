// User model for Auth
let User = require('../Models/user');
let passport = require('passport')

let displayRegisterForm = (req, res, next) => {
    let messages = req.session.messages || []
    req.session.messages = []

    res.render('auth/register', { title: 'Register' });

    res.render('auth/register', {
        title: 'Register',
        messages: messages 
    })
};

let displayLoginForm = (req, res, next) => {
    res.render('auth/login', { title: 'Login' });
};

let submitRegister = (req, res, next) => {

    User.register(new User({username: req.body.username}), req.body.password, (err, newUser) => {
        if(err){
            return res.render('auth/register', {messages: err})
        }
        else{
            req.login(newUser, (err) => {
                res.redirect('/media')
            })
        }
    })

}

// make public
module.exports = {
    displayRegisterForm,
    displayLoginForm,
    submitRegister,
};