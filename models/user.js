import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  image: { type: String },
  lastname: { type: String, required: true },
  emergencyContact: { type: String },
  gender: { type: String, required: true },
  age: { type: String },
  medicalHistory: {type: String,},
  allergies: {type: String,},
  phone: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user'], 
    default: 'user' 
  },
}, { timestamps: true, discriminatorKey: 'role' });

export const UserModel = mongoose.model('User', userSchema);