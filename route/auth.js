const { render } = require('ejs');
const express =  require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

router.get("/register", (req,res)=>{
    res.render('auth/signup')
})

router.post('/register', async(req,res)=>{   
    let {username, email, gender, password, role} = req.body;

    let user = new User({username, email, gender, role});
    let newUser = await User.register(user, password);
    res.redirect('/login')
})

router.get("/login", (req,res)=>{
    res.render('auth/login')
})

router.post('/login',
passport.authenticate('local',
{
    failureRedirect : '/login',
    failureMessage : true
}),
function(req,res){
    req.flash('success', `Welcome Back ${req.user.username}`)
    res.redirect('/login')
})

router.get('/logout', (req,res)=>{
    req.logout(()=>{
        req.flash('success', 'Logged out sucessfully')
        res.redirect('/login')
    });
})

module.exports = router;
