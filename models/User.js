const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = model('User', userSchema)

module.exports = {
  User,
}
