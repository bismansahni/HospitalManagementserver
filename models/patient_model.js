import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import addPasswordEncryption from '../Middleware/passwordEncryptor.js';

const PatientSchema = new mongoose.Schema({
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
  DOB:{
    type:Date,
  },
  BloodGroup:{
    type:String,
    enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  }
 
});

addPasswordEncryption(PatientSchema);

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient;
