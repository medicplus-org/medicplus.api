// routes/doctor.js
import {Router} from "express";
import {
  registerDoctor,
  logindoctor,
  getDoctors,
  getDoctorById,
  patchDoctor,
  deleteDoctor
} from "../controllers/doctor.js";
import { isAuthenticated,isDoctorAuthorized } from '../middlewares/auth.js';

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
doctorRouter.patch("/doctor/:id",doctorsPicturesUpload.single("image"),isAuthenticated,isDoctorAuthorized('doctor'), patchDoctor);

// Delete a doctor by ID
doctorRouter.delete("/doctor/:id",isAuthenticated,isDoctorAuthorized('doctor'),  deleteDoctor);

export default doctorRouter;
