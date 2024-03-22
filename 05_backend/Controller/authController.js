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
      // Create a new patient instance based on the request body
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
      // Save the patient data to the database
      const savedPatient = await newPatient.save();
      res.status(201).json(savedPatient); // Respond with the saved patient data
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log("hello")
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
      // Find the patient with the provided email
      const patient = await Patient.findOne({ email: email });
  
      // If no patient is found, return an error
      if (!patient) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Compare the provided password with the password stored in the database
  
  
  
      if (!await bcrypt.compare(password, patient.password)) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Generate a JWT token with the patient's ID
      const token = jwt.sign({ userId: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return the token as a response
      console.log("TOKEN GENERATED");
      res.status(200).json({ token });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}



// async function sendEmailWithData(email, data) {
//   try {
//     // Create a transporter object using SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.example.com', // Your SMTP host
//       port: 587, // Your SMTP port
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: 'khandelwalkh@rknec.edu', // Your email address
//         pass: '@flysky123' // Your password
//       }
//     });

//     // Construct email message
//     let mailOptions = {
//       from: 'khandewalkh@example.com', // Sender address
//       to: email, // Recipient address
//       subject: 'Prescription Information', // Subject line
//       text: JSON.stringify(data) // Email body, convert data to JSON string
//     };

//     // Send mail with defined transport object
//     let info = await transporter.sendMail(mailOptions);

//     console.log("Email sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// }






module.exports={
    addPatient,patientLogin
}