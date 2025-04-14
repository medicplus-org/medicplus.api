import { DoctorModel } from "../models/doctor.js";
import { doctorValidator, loginDoctorValidator } from "../validators/doctor.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmailSignup } from "../utils/mailingDoctor.js";

export const registerDoctor = async (req, res, next) => {
  const image = req.file?.path;
    
  const { error, value } = doctorValidator.validate({
    ...req.body,
    qualifications: [req.body.qualifications],
    image,
  }, { abortEarly: false });
  if (error) {
    return res.status(422).json(error);
  }

  // Check if user already exists
  const existingDoctor = await DoctorModel.findOne({
    $or: [{ name: value.name }, { email: value.email }],
  });

  if (existingDoctor) {
    return res.status(409).json("Doctor already exists");
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(value.password, 10);

  // Create doctor with role explicitly set
  const newDoctor = await DoctorModel.create({
    name: value.name,
    email: value.email,
    password: hashedPassword,
    phone: value.phone,
    gender: value.gender,
    age: value.age,
    role: "doctor", // Enforcing doctor role as per schema
    specialization: value.specialization,
    licenseNumber: value.licenseNumber,
    qualifications: value.qualifications,
    image: value.image,
    experience: value.experience,
    consultationFee: value.consultationFee
  });

  // Send welcome email
  sendEmailSignup(
    newDoctor.email,
    "Welcome Doctor to the Platform 🩺",
    newDoctor.userName,
    newDoctor.role
  );

  // Generate token
  const accessToken = jwt.sign(
    { id: newDoctor.id, role: newDoctor.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );

  res.status(201).json({
    message: "Doctor account created successfully!",
    accessToken,
  });
};

export const logindoctor =async (req,res, next) => {
  const {error,value} =loginDoctorValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  const doctor = await DoctorModel.findOne({
    email : value.email
  });
  if (!doctor) {
    return res.status(409).json("doctor does not exist");
  }
  const correctPassword = bcrypt.compareSync(value.password, doctor.password);
  if (!correctPassword) {
    return res.status(401).json("invalid credentials!");
  }
  const accessTokenLogin = jwt.sign(
    {id: doctor.id},
    process.env.JWT_SECRET_KEY,
    {expiresIn : "24h"}
  );
  res.status(200).json({
    accessTokenLogin,
    doctor: {
      role: doctor.role,
      email: doctor.email,
      doctorId: doctor.id
    },
  });
};


export const getDoctors = async (req, res, next) =>{
 try {
  const result = await DoctorModel.find();
  return res.json(result);
 } catch (error) {
  next(error)
 }
}
export const getDoctorById = async (req, res, next) => {
  try {
    const result =await DoctorModel.findById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error)
  }
}

export const patchDoctor = async (req, res, next) =>{
  try {
   const updateData = { ...req.body };
       
       // Check if a new image was uploaded
       if ( req.file?.path) {
         updateData.image = req.file?.path;
       }
       
       // Find and update the user
       const result = await DoctorModel.findByIdAndUpdate(req.params.id, updateData, {
         new: true,
         runValidators: true
       });
   if (!result){
    return res.status(404).json({
      message:"Doctor not found"
    })
   }
   return res.json({
    message: "Doctor updated successfully",
    data: result
  });
  } catch (error) {
   next(error)
  }
 }
export const deleteDoctor = async (req, res, next) =>{
  try {
   const result = await DoctorModel.findByIdAndDelete(req.params.id);
   if (!result){
    return res.status(404).json({
      message:"Doctor not found"
    })
   }
   return res.json({
    message: "Doctor deleted successfully"
  });
  } catch (error) {
   next(error)
  }
 }