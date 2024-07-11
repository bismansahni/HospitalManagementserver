
import Patient from '../models/patient_model.js';
import Doctor from '../models/doctors_model.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin_model.js';


export const patientloginmessage =async(req,res)=>{
    res.send("We are in patient login route");
}
export const doctorloginmessage =async(req,res)=>{
    res.send("We are in doctor login route");
}
export const adminloginmessage =async(req,res)=>{
    res.send("We are in admin login route");
}


export const patientregistermessage =async(req,res)=>{
    res.send("We are in patient registration route");
}


export const patientlogin=async(req,res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message:'Please enter all the fields'});
    }
    try{
       
        const userpatient=await Patient.findOne({email});
        if(!userpatient){
            return res.status(404).json({error: 'No user found!'});
        }
       
        const isMatch=await  bcrypt.compare(password, userpatient.password);
        if(!isMatch){
            return res.status(400).json({error:'Wrong credentials'});
        }
        
        const token = jwt.sign({ id: userpatient._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        res.status(200).json({ token ,username: userpatient.name});
    } catch(error){
        res.status(500).json({error : 'Login failed due to server error!'});
    }
}

export const patientregister = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: "Please enter all the fields" });
    }
    try {
        const existingUser = await Patient.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const userregister = new Patient({
            name,
            email,
            password
        });

  
        await userregister.save();

        const token = jwt.sign({ id: userregister._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ message: 'Patient registered successfully', username: userregister.name, token, status: "success" });
    } catch (error) {
        res.status(500).json({ message: ' It failed due to Server error' });
    }
};


export const adminlogin =async (req,res)=>{
    const{username,password}=req.body;
    if(!username || !password){
        return res.status(404).json({error:"Please enter all the fields"});
    }
    try{
        const nameofadmin=await Admin.findOne({name:username});
       
        if(nameofadmin===null){
            return res.status(404).json({message:"No valid admin. Access denied!"});
        }
        // if(username!=nameofadmin.name){
        //     return res.status(404).json({message:"No valid admin. Access denied!"});
        // }
       
        const isMatch=await  bcrypt.compare(password, nameofadmin.password);
        if(!isMatch){
            return res.status(400).json({error:'Wrong credentials'});
        }
       
        const token = jwt.sign({ id: nameofadmin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
        res.status(200).json({ token ,username: nameofadmin.name});  


    }
    catch(error){
        res.status(500).json({ message: ' Some problem in admin authentication' });
    }
};




export const registerdoctor = async (req, res) => {
  const { name, email, password, department } = req.body;

  if (!email || !password || !name || !department) {
    return res.status(400).json({ error: "Please fill out all the fields" });
  }

  try {
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(409).json({ error: "Doctor already exists" });
    }

    const validDepartments = ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Orthopedics'];

    if (!validDepartments.includes(department)) {
      return res.status(400).json({ error: "Department is invalid" });
    }

    const newDoc = new Doctor({
      name,
      email,
      password, // Password will be hashed by the pre-save middleware
      department
    });

    await newDoc.save();

    const token = jwt.sign({ id: newDoc._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({ token, message: "Doctor successfully registered" });
  } catch (error) {
    console.error('Error registering doctor:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const doctorlogin=async(req,res) =>{
    const {email,password}=req.body;
    
    
    if(!email || !password){
     return    res.status(404).json({message:"Please enter all the required fields"});
    }
    try{
        const doctordetails=await Doctor.findOne({email});
        if(doctordetails===null){
          return   res.status(404).json({message:"Your email id is wrong, or the user doesnt exist"});
        }
        const isMatch=await  bcrypt.compare(password, doctordetails.password);
        if(!isMatch){
            return res.status(400).json({error:'Wrong password'});
        }
       
        const token = jwt.sign({ id: doctordetails._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
        res.status(200).json({ token ,username: doctordetails.name});  


    }
    catch(error){
        return res.status(500).json({ error: "Some problem in doctor login" });
    }
}