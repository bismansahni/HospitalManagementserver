import Doctor from "../models/doctors_model.js";

export const doctorslotmessage=async(req,res)=>{
    res.send("We are in doctor time slot update route");
}

export const doctorslottask=async(req,res)=>{
   const {email, startTime, endTime}=req.body;
   try{
    const doctorname=await Doctor.findOne({email});
    console.log(email);
    console.log(startTime);
    console.log(endTime);

    if (!doctorname) {
        return res.status(404).send("Doctor not found");
      }
      doctorname.timeSlots = [];
      const newTimeSlot = {
        startTime,
        endTime
      };
  

      doctorname.timeSlots.push(newTimeSlot);
      await doctorname.save();

      res.status(200).json({name:doctorname.name,email:doctorname.email,updatedtime:doctorname.timeSlots});
    } catch (error) {
      console.error('Error updating time slot:', error);
      res.status(500).send("Internal server error");
    }
  };
   