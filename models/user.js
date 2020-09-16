const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email: String, 
  name: String, 
  password: String
})

// Create new User
User.statics.create = (name, password) => {
  const user = new this({
    name,
    password
  })

  return user.save()
}

// Find user by name
User.statics.findOneByName = (name) => {
  return this.findOne({
    name
  }).exec()
}

// Verify the password of User
User.methods.verify = (password) => {
  return this.password === password
}

module.exports = mongoose.model('User', User)