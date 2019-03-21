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
      gamertag,
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
      newUser.gamertag = gamertag
      newUser.email = email
      newUser.password = newUser.generateHash(password)
      newUser.save()
        .then(user => res.json(user))
        .catch(err => res.json(err))
    })
  },
  updateUser: function (req, res) {
    let userId = req.body._id

    let conditions = {
      _id: userId
    }

    let information = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gamertag: req.body.gamertag
    }

    let update = {
      $set: information
    }
    User.updateOne(conditions, update, { runValidators: true })
      .then(user => res.json(user))
      .catch(error => res.json(error))
  },
  deleteUser: function (req, res) {
    User.remove({ _id: req.body.id })
      .then(user => res.json(user))
      .catch(error => res.json(error))
  }
}
