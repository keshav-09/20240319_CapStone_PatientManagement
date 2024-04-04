const mongoose = require('mongoose');
/**
 * This is the Doctor Schema contain information related to the Doctor
 */
const doctorSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    trim: true,
    enum: ["male", "female", "other"],
  },
  PhoneNumber: {
    type: Number,
    minlength: 10,
    maxlength: 10,
  },
  specialty: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 200,
},
}, 
// { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
