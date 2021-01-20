const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Login Page
router.get('/signup', (req,res) => res.send('Login page')) 

module.exports = router

// Register Page
router.get('/login', (req,res) => res.send('Register page')) 

// Register Handle
router.post('/signup', (req,res) => {
    
    console.log(req.body)
    res.send('hello!!')
})

module.exports = router