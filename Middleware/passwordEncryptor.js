import bcrypt from 'bcryptjs';

const addPasswordEncryption = (schema) => {
  schema.pre('save', async function (next) {  // 'pre' defines a pre-save hook, 'next' is the callback to proceed
    if (!this.isModified('password')) {  // Check if the password field is modified
      return next();  // If not, call next() to proceed with saving the document
    }
    const salt = await bcrypt.genSalt(10);  // Generate salt for hashing
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password and assign it back to the field
    next();  // Call next() to proceed with saving the document
  });
};

export default addPasswordEncryption;
