const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email: { 
    type: String, 
    required: true,
    unique: true
  }, 
  name: { 
    type: String 
  }, 
  password: { 
    type: String,
    required: true 
  }
})

module.exports = mongoose.model('User', User)