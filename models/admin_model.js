import mongoose from 'mongoose';
import addPasswordEncryption from '../Middleware/passwordEncryptor.js';

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },

});

addPasswordEncryption(AdminSchema);

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
