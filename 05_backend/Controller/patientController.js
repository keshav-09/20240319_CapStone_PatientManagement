const patient =require("../Models/patientSchema")
/**
 * Get the profile information of a patient.
 * @param {Object} req - The request object.
 * @param {Object} req.patient - The patient object extracted from the request.
 * @param {Object} res - The response object.
 */

async function  patientProfile(req, res){

    const patient = req.patient
    try {
      const {
        name,
        email,
        age,
        gender,
        PhoneNumber,
        password
      } = patient;
  
  
      res.status(200).json({
        name,
        email,
        age,
        gender,
        PhoneNumber,
        password
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
module.exports = { patientProfile };