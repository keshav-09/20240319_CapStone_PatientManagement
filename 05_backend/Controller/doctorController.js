const doctor = require("../Models/doctorSchema")
const { verifyJwt, getUserMiddleware, getPatientMiddleware } = require("../Dependencies/jwtHelpers");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { emailValidator } = require('../Dependencies/validators/loginvalidation')
const Patient = require("../Models/patientSchema");
const Doctor = require("../Models/doctorSchema");
const Prescription = require("../Models/prescription");
const nodemailer = require('nodemailer');
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
  const { name, email, gender, phoneNumber, password, specialty } = req.body;
  console.log(req.body);
  // console.log(name)

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      name,
      email,
      gender,
      PhoneNumber: phoneNumber,
      password: hashedPassword,
      specialty,
    });
    console.log(req.body)

    const saveDoctor = await newDoctor.save();
    res.status(201).json(saveDoctor);
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

    console.log(currentDoctor)

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
    const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

    // Return the token as a response
    console.log("TOKEN GENERATED");
    res.status(200).json({ token });
  }
  catch (error) {

    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


/**
 * async function addPrescriptions(req, res) {
  const { email, disease, medicines } = req.body;


  if (!email || !disease || !medicines) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!emailValidator(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }
  try {
    // Find the patient using the provided email
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const doctor = req.user.userId; 

    // Create a new prescription object
    const newPrescription = new Prescription({
      doctor,
      patient: patient._id,
      email: patient.email, // Use fetched patient email
      disease,
      medicines,
    });

    // Save the prescription to the database and send email upon success:
    const savedPrescription = await newPrescription.save();
    //  here is the mail id that sent the mail to the patient

    const transporter = nodemailer.createTransport({

      service: "gmail",
      auth: {
        user: 'nodemailer470@gmail.com', 
        //  Pass contain the App passwords 
        pass: 'aydr qxge onmi dcik' 
      }
    });

    let medicineText = ''
    //  SAVE THE MEDICINE DATA TO THE MEDICINE TEXT TO PRINT IN THE MAIL
    for(let i = 0; i < medicines.length; i++) {
      medicineText += `<li><b>${medicines[i].MedicineName}</b>: ${medicines[i].frequency}, ${medicines[i].Period} days</li>`;
    }

    // medicine formate

    // "MedicineName": "Paracetamol",
    // "frequency" :"3 times a day",
    // "Period": 3

    // Prepare email content:
    const emailData = {
      from: 'Your Clinic Name <your_email@example.com>', // Sender information
      to: patient.email, // Use fetched patient email
      subject: 'New Prescription from Hospital',
      text: `Dear Patient,\n\nA new prescription has been created for you.\n\nDetails:\n* Disease: ${disease}\n* 
      Medicines: ${medicineText}`, // Formatted text representation
      html: `<!DOCTYPE html>
              <html>
              <body>
                <h1>New Prescription from Kims hospital</h1>
                <p>Dear Patient,</p>
                <p>A new prescription has been created for you.</p>
                <p>Details:</p>
                <ul>
                  <li>Disease: ${disease}</li>
                  <hr>
                  <li>Medicines:
                    <ul>
                      ${medicineText}
                    </ul>
                  </li>
                </ul>
              </body>
              </html>
             ` 
    };  

    await transporter.sendMail(emailData);

    res.status(201).json({ message: 'Prescription saved successfully and email sent.', savedPrescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving prescription' });
  }
}

 */

async function addPrescriptions(req, res) {
  const { email, disease, medicines } = req.body;

 
  if (!email || !disease || !medicines) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (!emailValidator(email)) {
        return res.status(400).json({ message: 'Invalid email' });
      }


  try {
    // Find the patient using the provided email
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }


    const doctor = req.user.userId; 

    // Create a new prescription object
    const newPrescription = new Prescription({
      doctor,
      patient: patient._id,
      email: patient.email, // Use fetched patient email
      disease,
      medicines,
    });

    // Save the prescription to the database and send email upon success:
    const savedPrescription = await newPrescription.save();
    //  here is the mail id that sent the mail to the patient
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'nodemailer470@gmail.com', 
        //  Pass contain the App passwords 
        pass: 'aydr qxge onmi dcik' 
      }
    });

    let medicineText = ''
    //  SAVE THE MEDICINE DATA TO THE MEDICINE TEXT TO PRINT IN THE MAIL
    for(let i = 0; i < medicines.length; i++) {
      medicineText += `<li><b>${medicines[i].MedicineName}</b>: ${medicines[i].frequency}, ${medicines[i].Period} days</li>`;
    }

    // medicine formate
    
    // "MedicineName": "Paracetamol",
    // "frequency" :"3 times a day",
    // "Period": 3

    // Prepare email content:
    const emailData = {
      from: 'Your Clinic Name <your_email@example.com>', // Sender information
      to: patient.email, // Use fetched patient email
      subject: 'New Prescription from Hospital',
      text: `Dear Patient,\n\nA new prescription has been created for you.\n\nDetails:\n* Disease: ${disease}\n* 
      Medicines: ${medicineText}`, // Formatted text representation
      html: `<!DOCTYPE html>
              <html>
              <body>
                <h1>New Prescription from Kims hospital</h1>
                <p>Dear Patient,</p>
                <p>A new prescription has been created for you.</p>
                <p>Details:</p>
                <ul>
                  <li>Disease: ${disease}</li>
                  <hr>
                  <li>Medicines:
                    <ul>
                      ${medicineText}
                    </ul>
                  </li>
                </ul>
              </body>
              </html>
             ` 
    };

    await transporter.sendMail(emailData);

    res.status(201).json({ message: 'Prescription saved successfully and email sent.', savedPrescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving prescription' });
  }
}
/**
 * async function addPrescriptions(req, res) {
  const { email, disease, medicines } = req.body;
  if (typeof req.body !== 'object') {
    return res.status(404).json({ message: 'Data must be an object' });
  }
  // Check if required fields are present
  if (!email || !disease || !medicines || !Array.isArray(medicines) || medicines.length === 0) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate email format
  if (!emailValidator(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  // Check if medicines have required fields (MedicineName, frequency, Period)
  const invalidMedicineFields = medicines.some(
    (medicine) =>
      !medicine.MedicineName ||
      !medicine.frequency ||
      !medicine.Period ||
      typeof medicine.MedicineName !== 'string' ||
      typeof medicine.frequency !== 'string' ||
      typeof medicine.Period !== 'number'
  );
  const invalidPeriodType = medicines.some((medicine) => typeof medicine.Period !== 'number');
  if (invalidPeriodType) {
    return res.status(422).json({ message: 'Enter the Period in Number' });
  }




  try {
    // Find the patient using the provided email
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const doctor = req.user.userId;
    console.log(doctor)

    // Create a new prescription object
    const newPrescription = new Prescription({
      doctor,
      patient: patient._id,
      email: patient.email,
      disease,
      medicines,
    });

    // Save the prescription to the database and send email upon success
    const savedPrescription = await newPrescription.save();

    // Send email to the patient
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nodemailer470@gmail.com',
        pass: 'aydr qxge onmi dcik',
      },
    });

    let medicineText = '';
    for (let i = 0; i < medicines.length; i++) {
      medicineText += `<li><b>${medicines[i].MedicineName}</b>: ${medicines[i].frequency}, ${medicines[i].Period} days</li>`;
    }

    // Prepare email content
    const emailData = {
      from: 'Your Clinic Name <your_email@example.com>',
      to: patient.email,
      subject: 'New Prescription from Hospital',
      text: `Dear Patient,\n\nA new prescription has been created for you.\n\nDetails:\n* Disease: ${disease}\n* Medicines: ${medicineText}`,
      html: `<!DOCTYPE html>
                <html> 
                <body>
                <h1>New Prescription from Kims hospital</h1>
                <p>Dear Patient,</p>
                <p>A new prescription has been created for you.</p>
                <p>Details:</p>
                <ul>
                <li>Disease: ${disease}</li>
                <hr>
                <li>Medicines: <ul>${medicineText}</ul></li>
                </ul>
                </body>
              </html>`,
    };

    await transporter.sendMail(emailData);
    res.status(201).json({ message: 'Prescription saved successfully and email sent.', savedPrescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving prescription' });
  }
}

 */





async function searchPrescriptionsByEmail(req, res) {
  const { email } = req.body;

  try {
    const prescriptions = await Prescription.find({ email: email }).populate('doctor', 'name email PhoneNumber -_id').populate('patient', 'name email PhoneNumber age gender -_id').exec();

    if (prescriptions.length === 0) {
      return res.status(404).json({ message: "No prescriptions found for the patient with the provided email." });
    }

    return res.status(200).json(prescriptions);
  } catch (err) {
    console.error("Error searching prescriptions:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllDoctorNames(req, res) {
  try {
    // Find all doctors in the database
    const doctors = await Doctor.find({}, 'name');

    // Extract names from the doctors array
    const doctorNames = doctors.map(doctor => doctor.name);

    // Return the list of doctor names
    res.status(200).json(doctorNames);
  } catch (error) {
    // Handle errors
    console.error('Error fetching doctor names:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
async function getAllDisease(req, res) {
  try {
    // Find all prescriptions in the database
    const prescriptions = await Prescription.find({}, 'disease');

    // Aggregate disease count
    const diseaseCount = prescriptions.reduce((acc, prescription) => {
      const disease = prescription.disease;
      acc[disease] = (acc[disease] || 0) + 1;
      return acc;
    }, {});

    // Convert disease count to pie chart format
    const pieChartData = Object.entries(diseaseCount).map(([disease, count]) => ({
      label: disease,
      count: count
    }));

    // Return the pie chart data
    res.status(200).json(pieChartData);
  } catch (error) {
    // Handle errors
    console.error('Error fetching disease data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
// Assuming you're using Express.js



module.exports = { getAllDisease, getAllDoctorNames, doctorProfile, addDoctor, doctorLogin, addPrescriptions, searchPrescriptionsByEmail }



// async function searchPrescriptionsByEmail(req, res) {
//   const { email } = req.body;
//   try {
//     const prescriptions = await Prescription.find({ email: email })
//       .populate('doctor', 'name email PhoneNumber -_id') // Projection to include only name, email, and PhoneNumber
//       .populate('patient')
//       .exec();

//     if (prescriptions.length === 0) {
//       return res.status(404).json({ message: "No prescriptions found for the patient with the provided email." });
//     }

//     // Construct response with required fields
//     const modifiedPrescriptions = prescriptions.map(prescription => ({
//       _id: prescription._id,
//       doctor: prescription.doctor,
//       disease: prescription.disease,
//       medicines: prescription.medicines,
//       createdAt: prescription.createdAt
//     }));


//    // 2. Configure email transporter (replace with your actual credentials):
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: '', // Replace with your email address
//         pass: '' // Replace with your email password
//       }
//     });

//     // 3. Prepare email content:
//     const emailData = {
//       from: 'Your Clinic Name <your_email@example.com>', // Sender information
//       to: email, // Recipient email from request body
//       subject: 'Your Prescriptions from [Your Clinic Name]',
//       text: `Dear Patient,\n\nHere are your prescriptions:\n\n${JSON.stringify(modifiedPrescriptions, null, 2)}`, // Formatted text representation of prescriptions
//       html: `<!DOCTYPE html>
//               <html>
//               <body>
//                 <h1>Your Prescriptions from [Your Clinic Name]</h1>
//                 <p>Dear Patient,</p>
//                 <p>Here are your prescriptions:</p>
//                 <pre>${JSON.stringify(modifiedPrescriptions, null, 2)}</pre>
//               </body>
//               </html>
//              ` // Optional HTML representation for richer formatting
//     };

//     // 4. Send the email:
//     await transporter.sendMail(emailData);

//     return res.status(200).json({ message: "Prescriptions sent successfully and response data included.", prescriptions: modifiedPrescriptions });
//   } catch (err) {
//     console.error("Error searching or sending prescriptions:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }


