const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  MedicineName: {
    type: String,
    required: true
  },
  /**
   *Time to take the medicine
   */  
  frequency: {
    type: String,
    required: true
  },
  Period :{
    type:Number,
    required:true
  }
  // Additional fields specific to the medicine can be added here
});

const prescriptionSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  disease:{
    type:String,
    required:true
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
  medicines: [medicineSchema], // Array of medicines
  // Additional fields such as prescription date, notes, etc. can be added as needed
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
