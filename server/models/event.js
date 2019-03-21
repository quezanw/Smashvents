import mongoose from 'mongoose'

let EventSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title required'] },
  description: { type: String, required: [true, 'Description required'] },
  location: { type: String, required: [true, 'Location required'] },
  startDate: { type: Date, required: [true, 'Start Date requied'] },
  endDate: { type: Date, required: [true, 'End Date requied'] },
  startTime: { type: Date, required: [true, 'Start Time requied'] },
  endTime: { type: Date, required: [true, 'End Time requied'] },
  hostID: { type: String, required: true },
  attendees: { type: Array }
}, { timestamps: true })

export default mongoose.model('Event', EventSchema)
