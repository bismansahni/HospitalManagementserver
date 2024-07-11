import express from 'express';
import { Router } from 'express';
import {doctorslotmessage,doctorslottask} from '../Controllers/timeslotController.js'
import Admin from '../models/admin_model.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';


const router=Router();

router.get('/doctorslots',doctorslotmessage);
router.post('/doctorslots',isAuthenticated(Admin),doctorslottask);


export default router;