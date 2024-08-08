const express = require('express')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')
const regRouter = require('./controllers/register')
const app = express()
const mongoose = require('mongoose')
const { URI } = require('./utils/config')
const cors = require('cors')
const { tokenExtractor, userExtractor, errorHandler, requestLogger } = require('./utils/middleware')
const path = require('path')

require('dotenv').config()

const frontend = path.join(__dirname, 'dist')


console.log('Connecting MongoDB..')
mongoose.connect(URI)
  .then(console.log('Connected to Mongodb')
  )

app.use(cors())
app.use(express.json())
if(process.env.NODE_ENV !== 'production') {
  app.use(requestLogger)
}
app.use(tokenExtractor)
app.use(userExtractor)

app.use(express.static('dist'))
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/register', regRouter)
app.use('*', express.static(frontend))

app.use(errorHandler)

module.exports = app