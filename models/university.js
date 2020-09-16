const mongoose = require('mongoose')
const Schema = mongoose.Schema

const University = new Schema({
  university_name: { 
    type: String, 
    required: true
  }, 
  start_date: { 
    type: Date,
    default: Date.now 
  }, 
  end_date: { 
    type: String,
    default: Date.now
  }
})

module.exports = mongoose.model('University', University)