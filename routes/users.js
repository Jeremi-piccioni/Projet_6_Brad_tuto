const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Login Page
router.get('/login', (req,res) => res.send('Login page')) 

module.exports = router

// Register Page
router.get('/register', (req,res) => res.send('Register page')) 

module.exports = router