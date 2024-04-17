const Patient =require("../Models/patientSchema")
const doctor=require("../Models/doctorSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const doctoController= require("../Controller/doctorController")

/**
 * Add a new patient to the database.
 * @param {Object} req-The request object containing patient details in the body.
 * @param {Object} res-The response object to send the result.
 * @returns {Object} Returns JSON response containing the saved patient data or 
 * error message.
 * @throws {Error} Throws an error if there is an issue with saving data.
 */
async function  addPatient(req, res){
    const { name, email, age, gender, PhoneNumber, password } = req.body;
    console.log(req.body);
    // console.log(name)
  
    try {
      // const newPatient = new Patient(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newPatient = new Patient({
        name,
        email,
        age,
        gender,
        PhoneNumber,
        password: hashedPassword
  
      });
      console.log(req.body)
      const savedPatient = await newPatient.save();
      res.status(201).json(savedPatient); 
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error)
    }
}
/**
 * Authenticate a patient with email and password.
 * @param {Object} req-The request object containing login details in the body.
 * @param {Object} res - The response object to send the authentication result.
 * 
 */
async function patientLogin (req,res){
    const { email, password } = req.body;
    console.log(req.body)
  
    try {
     const patient = await Patient.findOne({ email: email });
      if (!patient) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      /**
       * Check the password is valid or not
       */
      const isPasswordValid = await bcrypt.compare(password, patient.password) 
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      
      const token = jwt.sign({ userId: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log("TOKEN GENERATED");
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports={
    addPatient,patientLogin
}