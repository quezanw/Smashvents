/* eslint-disable no-unused-vars */
import passport from './passport'
import UserController from '../controller/users'

function validateForm (req, res, next) {
  req.checkBody('firstname')
    .notEmpty().withMessage({ firstname: 'First Name cannot be blank' })
    .isAlpha().withMessage({ firstname: 'Name must be only alphabetical characters' })
  req.checkBody('lastname')
    .notEmpty().withMessage('Last Name cannot be blank')
    .isAlpha().withMessage('Name must be only alphabetical characters')
  req.checkBody('email', 'Invalid Email')
    .notEmpty().withMessage('Email cannot be blank')
    .isEmail().withMessage('Invalid Email')
  req.checkBody('password')
    .notEmpty().withMessage('Password cannot be blank')
    .isLength({ min: 8 }).withMessage('Must be at least 8 characters long')

  var errors = req.validationErrors()
  if (errors) {
    console.log('Ping from validation')
    var response = { errors: [] }
    errors.forEach(err => {
      response.errors.push(err.msg)
    })
    console.log(response)

    res.statusCode = 400
    return res.send(response)
  }

  return next()
}

module.exports = function (app) {
  // app.get('/auth/users', UserController.index)
  // app.post('/auth/create', validateForm, UserController.createUser)
  // app.post('/auth/login',
  //   passport.authenticate('local'),
  //   (req, res) => res.json(req.user))
  // create update user info route
}
