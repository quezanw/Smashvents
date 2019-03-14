/* eslint-disable no-unused-vars */
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import expressValidator from 'express-validator'

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

require('./config/mongoose')
// require('./config/routes')(app)

app.listen(8000, err => err ? console.log(err) : console.log('listening on port 8000'))
