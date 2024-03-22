const express = require('express');
const router = express.Router();
const Patient = require('../Models/patientSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { verifyJwt, getUserMiddleware,getPatientMiddleware } = require("../Dependencies/jwtHelpers");
const authController= require("../Controller/authController")


router.post('/patients',authController.addPatient)

router.post("login",authController.patientLogin)

// router.post('/patients', async (req, res) => {
//     const { name, email, age, gender, PhoneNumber, password } = req.body;
//     console.log(req.body);
//     // console.log(name)
  
//     try {
//       // Create a new patient instance based on the request body
//       // const newPatient = new Patient(req.body);
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const newPatient = new Patient({
//         name,
//         email,
//         age,
//         gender,
//         PhoneNumber,
//         password: hashedPassword
  
//       });
//       console.log(req.body)
//       // Save the patient data to the database
//       const savedPatient = await newPatient.save();
//       res.status(201).json(savedPatient); // Respond with the saved patient data
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });

module.exports = router;
