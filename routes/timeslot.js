import express from 'express';
import { Router } from 'express';
import {doctorslotmessage} from '../Controllers/timeslotController.js'

const router=Router();

router.get('/doctorslots',doctorslotmessage);


export default router;