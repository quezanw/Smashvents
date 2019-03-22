import Event from '../models/event'
import User from '../models/user'

module.exports = {
  index: function (req, res) {
    console.log('get all events')
    Event.find({})
      .then(events => res.json(events))
      .catch(error => res.json(error))
  },
  findEvent: function (req, res) {
    Event.findOne({ _id: req.body._id })
      .then(event => res.json(event))
      .catch(error => res.json(error))
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
      .catch(error => res.json(error))
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
      .then(event => res.json(event))
      .catch(error => res.json(error))
  },
  deleteEvent: function (req, res) {
    Event.remove({ _id: req.body._id })
      .then(event => res.json(event))
      .catch(error => res.json(error))
  },
  // function should add a user id to attendees array
  // should also add the event id to the users attending array
  addUser: function (req, res) {
    console.log('add user function')
    let eventID = req.body.eventID
    let userID = req.body.userID
    console.log(req.body.eventID)
    let updateEvent = { $push: { attendees: userID } }
    let updateUser = { $push: { attending: eventID } }

    Event.updateOne({ _id: eventID }, updateEvent)
      .then(event => {
        if (!event) {
          return res.json({ success: false, message: 'could not match event' })
        }
        return User.updateOne({ _id: userID }, updateUser)
          .then(event => res.json(event))
          .catch(error => res.json(error))
      })
      .catch(error => res.json(error))
  }
}
