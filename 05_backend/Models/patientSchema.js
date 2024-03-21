const mongoose = require('mongoose');
/**
 * This is the PatientSchema for the Patinet Information
 */
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    validate: {
      validator: function (value) {
        // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 150, // Adjust max age as needed
  },
  gender: {
    type: String,
    // trim: true,
    enum: ["male", "female", "other"],
  },
  PhoneNumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 200,
},
},);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
