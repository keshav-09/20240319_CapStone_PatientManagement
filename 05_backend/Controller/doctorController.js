const doctor = require("../Models/doctorSchema")
const { verifyJwt, getUserMiddleware, getPatientMiddleware } = require("../Dependencies/jwtHelpers");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Patient = require("../Models/patientSchema");
const Doctor = require("../Models/doctorSchema");
const Prescription = require("../Models/prescription");
/**  Post api to add a new doctor.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing doctor details.
 * @param {string} req.body.name - The name of the doctor.
 * @param {string} req.body.email - The email of the doctor.
 * @param {string} req.body.gender - The gender of the doctor.
 * @param {string} req.body.PhoneNumber - The phone number of the doctor.
 * @param {string} req.body.password - The password of the doctor.
 * @param {string} req.body.specialty - The specialty of the doctor.
 * @param {Object} res - The response object.
 */
async function addDoctor(req, res) {
  const { name, email, gender, PhoneNumber, password, specialty } = req.body;
  console.log(req.body);
  // console.log(name)

  try {

    // Create a new patient instance based on the request body
    // const newPatient = new Patient(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      name,
      email,
      gender,
      PhoneNumber,
      password: hashedPassword,
      specialty,
    });
    console.log(req.body)
    // Save the patient data to the database
    const saveDoctor = await newDoctor.save();
    res.status(201).json(saveDoctor); // Respond with the saved patient data
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("error")
  }

}

/**
 * This is the api call to fetch the data to get for the profile
 */
async function doctorProfile(req, res) {
  const currentDoctor = req.doctor
  try {
    const {
      name,
      email,
      PhoneNumber,
      gender,
      specialty,

    } = currentDoctor;

    res.status(200).json({
      name,
      email,
      PhoneNumber,
      gender,
      specialty,
    });
  } catch (err) {
    // if any error 
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Doctor login.
 * @param {Object} req - The request object.
 * @param {string} req.body.email - The email of the doctor.
 * @param {string} req.body.password - The password of the doctor.
 * @param {Object} res - The response object.
 */
async function doctorLogin(req, res) {
  const { email, password } = req.body
  try {
    const doctor = await Doctor.findOne({ email: email });

    // If no patient is found, return an error
    if (!doctor) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the password stored in the database



    if (!await bcrypt.compare(password, doctor.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token with the patient's ID
    const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token as a response
    console.log("TOKEN GENERATED");
    res.status(200).json({ token });
  }
  catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function addPrescriptions(req, res) {
  const { email, disease, medicines } = req.body;

  // Validation (Optional but recommended)
  if (!email || !disease || !medicines) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const patient = await Patient.findOne({ email })
    const doctor = req.user.userId
    // Create a new prescription object
    const newPrescription = new Prescription({
      doctor,
      patient: patient._id,
      email,
      disease,
      medicines,
    });

    // Save the prescription to the database
    const savedPrescription = await newPrescription.save();

    res.status(201).json(savedPrescription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving prescription' });
  }
}

module.exports = { doctorProfile, addDoctor, doctorLogin, addPrescriptions }