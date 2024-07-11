import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Doctor from '../models/doctors_model.js';
import Appointment from '../models/appointment_model.js';

export const createappointmentmessage=async(req,res)=>{
    res.send("You are in the create appointment route");
}


export const selectdoctor= async (req, res) => {
    const { department } = req.body;
    const validDepartments = ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Orthopedics'];
    // console.log('Received department:', department); 
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
    // console.log(`Choosing a doctor for the ${department} department`);
    try {
        const departmentDocs = await Doctor.find({ department });
        return departmentDocs;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw new Error("Database query failed");
    }
};

export const makeappointment = async (req, res) => {
    const { doctorname, date } = req.body;
  
    try {
      // Find the doctor by name
      const doctor = await Doctor.findOne({ name: doctorname });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Fetch appointments for the doctor on the specified date
      const appointments = await Appointment.find({
        doctor: doctor._id,
        date: new Date(date),
      });
  
      // Log fetched appointments for debugging
    //   console.log('Appointments on the specified date:', appointments);
  
      // Generate time slots from 9:00 AM to 5:00 PM (30-minute intervals)
      const startHour = 9;
      const endHour = 17;
      const timeSlots = [];
  
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const startTime = new Date(`${date}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00.000Z`);
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + 30);
  
          timeSlots.push({ startTime, endTime });
        }
      }
  
      // Log generated time slots for debugging
    //   console.log('Generated time slots:', timeSlots);
  
      // Remove the booked slots from generated time slots
      const availableSlots = timeSlots.filter(slot => {
        return !appointments.some(appointment => {
          return (
            new Date(appointment.startTime) < slot.endTime && 
            new Date(appointment.endTime) > slot.startTime
          );
        });
      }).map(slot => ({
        startTime: slot.startTime.toISOString().slice(11, 16), // Format as "HH:MM"
        endTime: slot.endTime.toISOString().slice(11, 16), // Format as "HH:MM"
      }));
  
      // Log available slots for debugging
    //   console.log('Available slots:', availableSlots);
  
      res.status(200).json({ availableSlots });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch available time slots', details: error.message });
    }
  };


export const confirmAppointmentmessage = async (req, res) => {
    res.send("You are in the confirm appointment route");
  };
  
  export const confirmAppointment = async (req, res) => {
    const { doctorname, patientName, patientEmail, date, startTime } = req.body;
    // console.log(doctorname);
  
    try {
      // Find the doctor by name
      const doctor = await Doctor.findOne({ name: doctorname });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Define the end time of the appointment (30 minutes after the start time)
      const startTimeDate = new Date(startTime);
      const endTimeDate = new Date(startTime);
      endTimeDate.setMinutes(endTimeDate.getMinutes() + 30);
  
      // Define the doctor's working hours for the specified date
      const workingHoursStart = new Date(`${date}T${doctor.startTime}:00.000Z`);
      const workingHoursEnd = new Date(`${date}T${doctor.endTime}:00.000Z`);
  
      // Check if the requested slot is within working hours
      if (startTimeDate < workingHoursStart || endTimeDate > workingHoursEnd) {
        return res.status(400).json({ message: 'Requested time slot is outside of working hours' });
      }
  
      // Check for existing appointments to ensure the slot is available
      const existingAppointments = await Appointment.find({
        doctor: doctor._id,
        date: new Date(date),
        $or: [
          { startTime: { $lt: endTimeDate, $gte: startTimeDate } },
          { endTime: { $gt: startTimeDate, $lte: endTimeDate } },
        ],
      });
  
      if (existingAppointments.length > 0) {
        return res.status(400).json({ message: 'Requested time slot is already booked' });
      }
  
      // Create a new appointment
      const newAppointment = new Appointment({
        doctor: doctor._id,
        patientName,
        patientEmail,
        date: new Date(date),
        startTime: startTimeDate,
        endTime: endTimeDate,
      });
  
      await newAppointment.save();
  
      res.status(201).json({ message: 'Appointment confirmed successfully', appointment: newAppointment });
    } catch (error) {
      res.status(500).json({ error: 'Failed to confirm the appointment', details: error.message });
    }
  };