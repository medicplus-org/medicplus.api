// routes/doctor.js
import {Router} from "express";
import {
  registerDoctor,
  logindoctor,
  getDoctors,
  getDoctorById,
  patchDoctor
} from "../controllers/doctor.js";
import { isAuthenticated,isAuthorized } from '../middlewares/auth.js';

import { doctorsPicturesUpload } from '../middlewares/uploads.js';

const doctorRouter = Router();

// Register a new doctor
doctorRouter.post("/doctor/register",doctorsPicturesUpload.single("image"), registerDoctor);

// Login a doctor
doctorRouter.post("/doctor/login", logindoctor);

// Get all doctors
doctorRouter.get("/doctor",isAuthenticated, getDoctors);

// Get a doctor by ID
doctorRouter.get("/doctor/:id",isAuthenticated, getDoctorById);

// Update a doctor by ID
doctorRouter.patch("/doctor/:id",doctorsPicturesUpload.single("image"), patchDoctor);

// Delete a doctor by ID
// doctorRouter.delete("/doctor/:id", deleteDoctor);

export default doctorRouter;
