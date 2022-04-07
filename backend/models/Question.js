const mongoose = require('mongoose')

const { Schema, model } = mongoose

const questionSchema = new Schema({
  name: String,
  question: { type: String, required: true },
  answer: { type: String },
  author: { type: String, required: true },
  answeredBy: { type: String },
})

const Question = model('Question', questionSchema)

module.exports = Question
