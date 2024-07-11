import express from 'express';
import { Router } from 'express';
import { createappointmentmessage,selectdoctor,makeappointment} from '../Controllers/appointmentController.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';
import Patient from '../models/patient_model.js';

const router=Router();

router.get('/createappointment',createappointmentmessage);
router.post('/createappointment',isAuthenticated(Patient), selectdoctor);



router.post('/makeappointment',isAuthenticated(Patient), makeappointment);


export default router;