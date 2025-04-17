import {Router} from "express";
import { addAppointment, deleteAppointment, getAppointment, getAppointments, patchAppointment } from "../controllers/appointment.js";
import { isAuthenticated } from "../middlewares/auth.js";


const appointmentRouter = Router();

appointmentRouter.post("/appointment",addAppointment);
appointmentRouter.get('/appointment',isAuthenticated, getAppointments);
appointmentRouter.get('/appointment/:id',isAuthenticated, getAppointment);
appointmentRouter.patch('/appointment',isAuthenticated, patchAppointment);
appointmentRouter.delete('/appointment',isAuthenticated, deleteAppointment);


export default appointmentRouter;