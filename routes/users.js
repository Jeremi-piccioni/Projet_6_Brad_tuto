const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// User model
const User = require('../models/User')   // This line crash the server... but why ??

// Login Page
router.get('/signup', (req,res) => res.send('Login page'))  // api/auth

module.exports = router

// Register Page
router.get('/login', (req,res) => res.send('Register page'))  // api/auth

// Register Handle
router.post('/signup', (req,res) => {    // api/auth
    const { email, password} = req.body
    console.log(req.body)
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
    req.send(errors)

} else{
    res.send('pass')
}
console.log(errors)
})

module.exports = router