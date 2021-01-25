const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')

// User model
const User = require('../models/User')   

// Login Page
router.get('/signup', (req,res) => res.send('Login page'))  // api/auth

module.exports = router

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
                        res.redirect('/login')
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
router.post('/login', (req,res,next) => {
    passport.authenticate('local',{
        successRedirect: '/dashboard', // <-- route with succesful authentification to be defined
        failureRedirect: '/users/login' // <-- route with login failure /login ??
        
    }) (req,res,next)
})

// Logout Handle
router.get('/logout', (req,res) =>{
    req.logout()
    //
    res.redirect('/users/login')
})
module.exports = router