/* eslint-disable no-unused-vars */
import express from 'express'
const bodyParser = require('body-parser')
// const express = require('express')
const session = require('express-session')
// const passport = require('./config/passport')
const cors = require('cors')
const expressValidator = require('express-validator')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(expressValidator())
app.use(cors())
// app.use(passport.initialize())
// app.use(passport.session())

// require('./config/mongoose')
// require('./config/routes')(app)

app.listen(8000, err => err ? console.log(err) : console.log('listening on port 8000'))
