import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Doctor from '../models/doctors_model.js';

export const createappointmentmessage=async(req,res)=>{
    res.send("You are in the create appointment route");
}


export const selectdoctor= async (req, res) => {
    const { department } = req.body;
    const validDepartments = ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Orthopedics'];
    console.log('Received department:', department); 
    if (!validDepartments.includes(department)) {
        return res.status(404).json({ error: "Department not found" });
    }

    try {
        const doctors = await chooseDoctor(department);
        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: "Sorry, but no doctor exists for this department" });
        }

        res.status(200).json({ message: "Doctors found successfully", doctors });
    } catch (error) {
        console.error('Error choosing doctor:', error);
        res.status(500).json({ error: "Failed to choose a doctor" });
    }
};

   


const chooseDoctor = async (department) => {
    console.log(`Choosing a doctor for the ${department} department`);
    try {
        const departmentDocs = await Doctor.find({ department });
        return departmentDocs;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw new Error("Database query failed");
    }
};

export const makeappointment=async(req,res)=>{
    const  {doctorname:doctor}=req.body;
   
    try{
        const availabletimings=await Doctor.find(doctorname.timeSlots);
    }
    catch(error){
        res.status(500).json({ error: "Failed to make an appointment " });
    }

    
}
