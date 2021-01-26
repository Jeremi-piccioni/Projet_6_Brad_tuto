const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// User model
const User = require('../models/User')   

const jwt = require('jsonwebtoken');
const passport = require('passport')
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'iloveraclette';

var strategy = new JwtStrategy(jwtOptions, function(token, next) {
  console.log('jwt token received', token);
  // usually this would be a database call:
//   var user = users[_.findIndex(users, {id: token.id})];
  User.findOne({id: token.id})
  .then( (user)=>{
    next(null, user);
  })
  .catch((err)=>{
    next(null, false);
  })
});

passport.use(strategy);
router.use(passport.initialize())

// Login Page
router.get('/signup', (req,res) => res.send('Login page'))  // api/auth


// Register Page
router.get('/login', (req,res) => res.send('Register page'))  // api/auth

// Register Handle
router.post('/signup', (req,res) => {    // api/auth
    const { email, password} = req.body
    console.log('req.body line 20: ' + req.body)
    let errors = []

// Check required fields
if(!email || !password) {
    errors.push( {message: 'Please fill all fields'} )
    }
// Check pass lengh 
if(password.length < 6){
    errors.push( {message:'Password should be at least 6 characters'} )
    }

if(errors.length > 0) {
    console.log(errors)
    res.send(errors) 
    
} else{
// Validation passed
    User.findOne( {email:email} )
    .then(user => {
        if(user) {
            // User already exist
            errors.push({message: 'This email already registered'})
            res.send(errors)
        }
        else{
            const newUser = new User({
                email,
                password

            })
            // Hash Password
            bcrypt.genSalt(10, (err,salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    // Set plain password to hashed password
                    newUser.password = hash

                    console.log('Pass in bcrypt')
                    // Save user
                    newUser.save()
                    .then(user => {
                        // res.redirect('/login')
                        console.log("signup ok!")
    
                        res.json({message:"OK"})
                    })
                    .catch(err => console.log(err))
                }))
        }
    })
   // .catch(err)
  //  res.send('pass')
}
console.log('errors from array line 71:' + errors)
})

// Login Handle
router.post('/login', async (req,res,next) => {
    // passport.authenticate('local',{
    //     successRedirect: '/dashboard', // <-- route with succesful authentification to be defined
    //     // failureRedirect: '/users/login' // <-- route with login failure /login ??
    //     failureRedirect: '/api/auth/login' // <-- route with login failure /login ??
        
    // }) (req,res,next)
    console.log("login...")
    var user = await User.findOne({ email: req.body.email }).exec();
    console.log("user",user)
    if(!user) {
        return res.status(400).send({ message: "The username does not exist" });
    }
    console.log("compare...")
    if(!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).send({ message: "The password is invalid" });
    }
    console.log("jwt...")
    
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});
})

// Logout Handle
router.get('/logout', (req,res) =>{
    
    // req.logout()
    //
    // res.redirect('/users/login')
    re.json({message:"logged out"})
})
module.exports = router