// const mongoose = require('mongoose')
import mongoose from 'mongoose'

module.exports = mongoose.connect('mongodb://localhost/smashvents', { useNewUrlParser: true })
