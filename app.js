const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app =express()

// DB Config
const db = require('./congif/keys').MongoURI

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB !'))
.catch(err => console.log(err))

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/', require('./routes/index'))
app.use('/api/auth', require('./routes/users'))

const PORT = process.env.PORT ||3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))