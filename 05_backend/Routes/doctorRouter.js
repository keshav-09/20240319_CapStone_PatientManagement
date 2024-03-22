const express = require('express');
const router = express.Router();
const Doctor = require('../Models/doctorSchema');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { verifyJwt, getUserMiddleware,getPatientMiddleware,getDoctorMiddleware } = require("../Dependencies/jwtHelpers");
const doctoController= require("../Controller/doctorController")

router.get("/doctorProfile",verifyJwt, getDoctorMiddleware ,doctoController.doctorProfile)
router.post('/newdoctor',doctoController.addDoctor)
router.post('/Doclogin',doctoController.doctorLogin)
router.post("/prescriptions",verifyJwt,doctoController.addPrescriptions)
router.post('/search',doctoController.searchPrescriptionsByEmail)

module.exports = router;

// POST API to save patient data
// router.post('/newdoctor', async (req, res) => {
//     const {name,email,gender,PhoneNumber,password,specialty } = req.body;
//     console.log(req.body);
//     // console.log(name)
    
//   try {

//     // Create a new patient instance based on the request body
//     // const newPatient = new Patient(req.body);
//     const hashedPassword =  await bcrypt.hash(password, 10);

//     const newDoctor= new Doctor({
//         name,
//         email,
//         gender,
//         PhoneNumber,
//         password: hashedPassword,
//         specialty,
//       });
//     console.log(req.body)
//     // Save the patient data to the database
//     const saveDoctor = await newDoctor.save();
//     res.status(201).json(saveDoctor); // Respond with the saved patient data
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//     console.log("error")
//   }
// });
// router.post('/Doclogin' ,async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body)

//   try {
//     // Find the patient with the provided email
//     const doctor = await Doctor.findOne({ email: email });

//     // If no patient is found, return an error
//     if (!doctor) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Compare the provided password with the password stored in the database



//     if (!await bcrypt.compare(password, doctor.password)) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate a JWT token with the patient's ID
//     const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Return the token as a response
//     console.log("TOKEN GENERATED");
//     res.status(200).json({ token });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });



// router.post('/prescriptions', async (req, res) => {
//   const { doctor, patient, email, disease, medicines } = req.body;

//   // Validation (Optional but recommended)
//   if (!doctor || !patient || !email || !disease || !medicines) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   try {
//     // Create a new prescription object
//     const newPrescription = new Prescription({
//       doctor,
//       patient,
//       email,
//       disease,
//       medicines,
//     });

//     // Save the prescription to the database
//     const savedPrescription = await newPrescription.save();

//     res.status(201).json(savedPrescription);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error saving prescription' });
//   }
// });



