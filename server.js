/* eslint-disable no-console */

const express = require('express')
const cookieSession = require('cookie-session')

const mongoose = require('mongoose')

const authenticaiton = require('./middlewares/isAuthenticated')
const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuswire-lite'

// mongodb connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// session
app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use(authenticaiton)

// default error handling
app.use((err, req, res, next) => {
  res.status(500).send(`There was an error with error message: ${err}!`)
})

// routers
app.use('/account', accountRouter)
app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`Listening to port: ${port}`)
  console.log(`MongoDB is connected at ${MONGO_URI}`)
})
