const express = require('express')
const mongoose = require('mongoose')
const app =express()

// DB Config
const db = require('./congif/keys').MongoURI

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB !'))
.catch(err => console.log(err))

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT ||5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))