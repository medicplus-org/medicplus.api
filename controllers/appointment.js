import { AppointmentModel } from "../models/appointment.js";
import { DoctorModel } from "../models/doctor.js";
import { UserModel } from "../models/user.js";
import { appointmentValidationSchema } from "../validators/appointment.js"
import mongoose from "mongoose";



export const addAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({
        message: "Validation error",
        error: ["Invalid User ID format"]
      });
    }
    
    const UserExists = await UserModel.findById(patientId);
    if (!UserExists) {
      return res.status(400).json({
        message: "Validation error",
        error: ["User does not exist"]
      });
    }
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({
        message: "Validation error",
        error: ["Invalid Doctor ID format"]
      });
    }
    
    const doctorExists = await DoctorModel.findById(doctorId);
    if (!doctorExists) {
      return res.status(400).json({
        message: "Validation error",
        error: ["Doctor does not exist"]
      });
    }
    
    const {error,value} = appointmentValidationSchema.validate(req.body,{abortEarly:false});
    if (error) {
      return res.status(422).json({
        message: "Validation error",
        error: error.details.map((detail)=>detail.message)
      })}
    const result = await AppointmentModel.create(value);
    return res.status(201).json({
      message: "Appointment successfully created",
      data: result
    })
  } catch (error) {
    next(error)
  }
}  

export const getAppointments = async (req, res) => {
  try {
    const tokenUserId = req.auth.id;
    
    // Check if the user exists in either model
    const isDoctor = await DoctorModel.exists({ _id: tokenUserId });
    const isPatient = await UserModel.exists({ _id: tokenUserId });
    
    if (!isDoctor && !isPatient) {
      return res.status(404).json({ message: "User not found" });
    }
    
    let appointments = [];
    
    if (isDoctor) {
      // If doctor, get appointments where doctorId matches
      appointments = await AppointmentModel.find({ doctorId: tokenUserId }).populate("doctorId patientId");
    } else {
      // If patient, get appointments where patientId matches
      appointments = await AppointmentModel.find({ patientId: tokenUserId }).populate("doctorId patientId");
    }
    
    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAppointment = async (req, res) => {
  try {
    const tokenUserId = req.auth.id;
    
    // Check if the user exists in either model
    const isDoctor = await DoctorModel.exists({ _id: tokenUserId });
    const isPatient = await UserModel.exists({ _id: tokenUserId });
    
    if (!isDoctor && !isPatient) {
      return res.status(404).json({ message: "User not found" });
    }
    
    let appointments = [];
    
    if (isDoctor) {
      // If doctor, get appointments where doctorId matches
      appointments = await AppointmentModel.findById(req.params.id,{ doctorId: tokenUserId }).populate("doctorId patientId");
    } else {
      // If patient, get appointments where patientId matches
      appointments = await AppointmentModel.findById(req.params.id,{ patientId: tokenUserId }).populate("doctorId patientId");
    }
    
    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const patchAppointment = async (req, res, next) => {
  try {
    const authenticatedUserId = req.auth.id;
    const appointmentId = req.params.id;
    
    // First, find the appointment
    const appointment = await AppointmentModel.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    
    // Check if authenticated user is either the patient or doctor for this appointment
    if (appointment.patientId.toString() !== authenticatedUserId && 
        appointment.doctorId.toString() !== authenticatedUserId) {
      return res.status(403).json({
        message: "Forbidden: You can only update your own appointments"
      });
    }
    
    // If authorized, update the appointment
    const result = await AppointmentModel.findByIdAndUpdate(
      appointmentId, 
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    return res.json({
      message: "Appointment updated successfully",
      data: result
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteAppointment = async (req, res) =>{
  try {
    const authenticatedUserId = req.auth.id;
    const appointmentId = req.params.id;
    
    // First, find the appointment
    const appointment = await AppointmentModel.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }
    
    // Check if authenticated user is either the patient or doctor for this appointment
    if (appointment.patientId.toString() !== authenticatedUserId && 
        appointment.doctorId.toString() !== authenticatedUserId) {
      return res.status(403).json({
        message: "Forbidden: You can only delete your own appointments"
      });
    }
    
    // If authorized, update the appointment
    const result = await AppointmentModel.findByIdAndDelete(
      appointmentId, 
      req.body,
    );
    
    return res.json({
      message: "Appointment deleted successfully",
      data: result
    });
  
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
 }