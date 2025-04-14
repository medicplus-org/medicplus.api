import { AppointmentModel } from "../models/appointment.js";
import { DoctorModel } from "../models/doctor.js";
import { UserModel } from "../models/user.js";
import { appointmentValidationSchema } from "../validators/appointment.js"



export const addAppointment = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Validation error",
        error: ["Invalid User ID format"]
      });
    }
    
    const UserExists = await UserModel.findById(userId);
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

export const getCategories = async (req, res, next) =>{
 try {
  const {filter = '{}',sort = '{}'} = req.query;
      const result = await AppointmentModel.find(JSON.parse(filter)).sort(JSON.parse(sort))
      return res.status(200).json(result);
 } catch (error) {
  next(error)
 }
}

export const patchAppointment = async (req, res, next) =>{
  try {
   const result = await AppointmentModel.findByIdAndUpdate(req.params.id, req.body,{
    new:true,
    runValidators:true
   });
   if (!result){
    return res.status(404).json({
      message:"Appointment not found"
    })
   }
   return res.json({
    message: "Appointment updated successfully",
    data: result
  });
  } catch (error) {
   next(error)
  }
 }
export const deleteAppointment = async (req, res, next) =>{
  try {
   const result = await AppointmentModel.findByIdAndDelete(req.params.id);
   if (!result){
    return res.status(404).json({
      message:"Appointment not found"
    })
   }
   return res.json({
    message: "Appointment deleted successfully"
  });
  } catch (error) {
   next(error)
  }
 }