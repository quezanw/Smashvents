import Event from '../models/event'
// const User = require('../models/user')

module.exports = {
  index: function (req, res) {
    console.log('get all events')
    Event.find({})
      .then(events => res.json(events))
      .catch(err => res.json(err))
  },
  createEvent: function (req, res) {
    console.log('Create event attempt ping')
    const { body } = req
    const {
      title,
      description,
      location,
      startDate,
      endDate,
      startTime,
      endTime,
      hostID
    } = body

    let newEvent = new Event()

    newEvent.title = title
    newEvent.description = description
    newEvent.location = location
    newEvent.startDate = startDate
    newEvent.endDate = endDate
    newEvent.startTime = startTime
    newEvent.endTime = endTime
    newEvent.hostID = hostID
    newEvent.save()
      .then(event => res.json(event))
      .catch(err => res.json(err))
  }
}
  // updateUser: function (req, res) {
  //   let userId = req.body._id

  //   let conditions = {
  //     _id: userId
  //   }

  //   let information = {
  //     firstname: req.body.firstname,
  //     lastname: req.body.lastname,
  //     gamertag: req.body.gamertag
  //   }

  //   let update = {
  //     $set: information
  //   }
  //   User.updateOne(conditions, update, { runValidators: true })
  //     .then(user => res.json(user))
  //     .catch(error => res.json(error))
  // },
  // deleteUser: function (req, res) {
  //   User.remove({ _id: req.body.id })
  //     .then(user => res.json(user))
  //     .catch(error => res.json(error))
  // }