import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  age: { type: Number, min: 0 },
  role: { 
    type: String, 
    enum: [, 'doctor'], 
    default: 'doctor'}, 
  specialization: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  qualifications: [{ type: String, required: true }],
  image: { type: String, required: true },
  experience: { type: Number, required: true, min: 0 },
  consultationFee: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export const DoctorModel =  mongoose.model('Doctor', doctorSchema);