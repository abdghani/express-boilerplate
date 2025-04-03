const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const winston = require('winston')

const { authorizeUser } = require('@app/util/authorize')

const app = express()

app.use(logger('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))
app.use(authorizeUser)
app.use(cookieParser())
require('@app/routes/index')(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

const errorLogger = (error, req, res) => {
  winston.error(error.message) // or using any fancy logging library
  return res
    .status(error.status || 500)
    .json({ status: error.status || 500, message: error.message || 'Internal Server Error' })
}

const failSafeHandler = (err, _, res) =>
  res.status(err.status || 500).json({ status: err.status, message: err.message })

app.use(errorLogger)
app.use(failSafeHandler)

module.exports = app
