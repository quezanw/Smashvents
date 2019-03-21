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
  },
  updateEvent: function (req, res) {
    let eventID = req.body._id

    let conditions = {
      _id: eventID
    }

    let information = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      hostID: req.body.hostID
    }

    let update = {
      $set: information
    }
    Event.updateOne(conditions, update, { runValidators: true })
      .then(user => res.json(user))
      .catch(error => res.json(error))
  },
  deleteEvent: function (req, res) {
    Event.remove({ _id: req.body._id })
      .then(user => res.json(user))
      .catch(error => res.json(error))
  }
}
