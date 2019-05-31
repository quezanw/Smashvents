import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
// import EventSchema from './event'

let UserSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, 'First name required'] },
  lastname: { type: String, required: [true, 'Last name required'] },
  gamertag: { type: String, required: [true, 'Gamertag required'] },
  email: { type: String, required: [true, 'Email requied'] },
  password: { type: String, required: [true, 'Password required'], minlength: 8 },
  hosting: { type: Array },
  attending: { type: Array }
}, { timestamps: true })

// UserSchema.methods.generateHash = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// }

// UserSchema.methods.validatePassword = (password) => {
//   return bcrypt.compareSync(password, this.password)
// }

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
