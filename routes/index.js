const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../congif/auth')

// Welcome Page
router.get('/', (req,res) => res.send('Welcome to the jungle!')) 

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req,res) => 
res.send('You are logged in!'))

module.exports = router