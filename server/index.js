const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')

const route = require('../route')

const app = express()

// CORS config
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET'],
    allowedHeaders: ['Content-Type']
  })
)

// security headers middleware
app.use(helmet())

// request body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// compacting requests using GZIP middleware
app.use(compression())

// import Route
app.use('/', route)

module.exports = app
