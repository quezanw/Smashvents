import User from '../models/user'
// const User = require('../models/user')

module.exports = {
  index: function (req, res) {
    console.log('index auth')
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.json(err))
  },
  createUser: function (req, res) {
    console.log('Create user attempt ping')
    const { body } = req
    const {
      firstname,
      lastname,
      email,
      password
    } = body

    User.find({
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.json({
          data: err,
          msg: 'Server error'
        })
      } else if (previousUsers.length > 0) {
        return res.json({
          data: err,
          msg: 'email exists'
        })
      }

      let newUser = new User()

      newUser.firstname = firstname
      newUser.lastname = lastname
      newUser.email = email
      newUser.password = newUser.generateHash(password)
      newUser.save()
        .then(user => res.json(user))
        .catch(err => res.json(err))
    })
  }
}
