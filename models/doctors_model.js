import mongoose from 'mongoose';

const TimeSlotSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Orthopedics'],
  },
  timeSlots: {
    type: [TimeSlotSchema],
    default: [],
  },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;
