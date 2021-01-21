const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({    // new commented as desespeted move
  
        email:{  
            type: String,
            required: true
        },

        password:{  
            type: String,
            required: true
        },

        date:{  
            type: Date,
            default: Date.now
        }
})

const User = mongoose.model('User',UserSchema)

module.exports = User