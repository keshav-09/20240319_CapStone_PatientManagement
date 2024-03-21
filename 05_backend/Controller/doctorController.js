const doctor=require("../Models/doctorSchema")

async function doctorProfile(req,res){
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
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


module.exports={doctorProfile}