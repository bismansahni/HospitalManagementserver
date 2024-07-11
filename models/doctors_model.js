import mongoose from 'mongoose';
import addPasswordEncryption from '../Middleware/passwordEncryptor.js';


const TimeSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  slots: [
    {
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
      available: {
        type: Boolean,
        default: true,
      },
    },
  ],
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
  timeSlots: [TimeSlotSchema],
});

addPasswordEncryption(DoctorSchema);

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;
