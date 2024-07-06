import mongoose from 'mongoose';
import addPasswordEncryption from '../Middleware/passwordEncryptor.js';

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
});

addPasswordEncryption(DoctorSchema);

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;
