import express from 'express';
import { Router } from 'express';
import { patientloginmessage,doctorloginmessage,adminloginmessage,patientregister, patientregistermessage,patientlogin,adminlogin , registerdoctor} from '../Controllers/authController.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';
import Admin from '../models/admin_model.js';

const router=Router();

router.get('/login/patient',patientloginmessage);
router.get('/login/doctor',doctorloginmessage);
router.get('/login/admin',adminloginmessage);

router.get('/register/patient',patientregistermessage);


router.post('/login/patient',patientlogin);
router.post('/login/doctor',patientlogin);
router.post('/login/admin',adminlogin);


router.post('/register/patient',patientregister)


router.post('/admin/registerdoctor',isAuthenticated(Admin),registerdoctor);

export default router;