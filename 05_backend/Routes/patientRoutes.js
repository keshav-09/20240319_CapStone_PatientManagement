const express = require('express');
const router = express.Router();
const Patient = require('../Models/patientSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { verifyJwt, getUserMiddleware,getPatientMiddleware } = require("../Dependencies/jwtHelpers");
const patientController= require("../Controller/patientController")




// POST API to save patient data
// router.post('/patients', async (req, res) => {
//   const { name, email, age, gender, PhoneNumber, password } = req.body;
//   console.log(req.body);
//   // console.log(name)

//   try {
//     // Create a new patient instance based on the request body
//     // const newPatient = new Patient(req.body);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newPatient = new Patient({
//       name,
//       email,
//       age,
//       gender,
//       PhoneNumber,
//       password: hashedPassword

//     });
//     console.log(req.body)
//     // Save the patient data to the database
//     const savedPatient = await newPatient.save();
//     res.status(201).json(savedPatient); // Respond with the saved patient data
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// POST API for patient login

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body)

//   try {
//     // Find the patient with the provided email
//     const patient = await Patient.findOne({ email: email });

//     // If no patient is found, return an error
//     if (!patient) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Compare the provided password with the password stored in the database



//     if (!await bcrypt.compare(password, patient.password)) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate a JWT token with the patient's ID
//     const token = jwt.sign({ userId: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Return the token as a response
//     console.log("TOKEN GENERATED");
//     res.status(200).json({ token });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


router.get("/pprofile", verifyJwt, getPatientMiddleware ,patientController.patientProfile )  
router.get("/patinetprescription",verifyJwt,getPatientMiddleware,patientController.prescriptionHistory) 

module.exports = router;
