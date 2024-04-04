const patient =require("../Models/patientSchema")
const Prescription=require("../Models/prescription")
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




  async function prescriptionHistory (req, res)  {
    try {
      const patientId = req.user.userId; 
      console.log(patientId)
      // Retrieve prescriptions for the patient
      const prescriptions = await Prescription.find({ patient: patientId }).populate('doctor').exec();

      // Check if any prescriptions are found
      if (prescriptions.length === 0) {
        return res.status(404).json({ message: "No prescriptions found for the patient." });
      }
  
      // Construct response with prescription details and doctor's name
      const prescriptionHistory = prescriptions.map(prescription => ({
        _id: prescription._id,
        doctorName: prescription.doctor.name, 
        // Assuming doctor's name is stored in the doctor object
        disease: prescription.disease,
        createdAt: prescription.createdAt,
        medicines: prescription.medicines
      }));
  
      // Send the prescription history as response
      return res.status(200).json(prescriptionHistory);
    } catch (err) {
      console.error("Error fetching prescription history:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
module.exports = { patientProfile,prescriptionHistory };