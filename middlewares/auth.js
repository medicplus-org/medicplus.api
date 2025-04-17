import {expressjwt} from "express-jwt";
import { UserModel } from "../models/user.js";
import { DoctorModel } from "../models/doctor.js";


export const isAuthenticated = expressjwt ({
  secret : process.env.JWT_SECRET_KEY,
  algorithms : ["HS256"],
});

export const isUserAuthorized = (role) => {
  return async (req, res, next) => {
    const user = await UserModel.findById(req.auth.id);
    if (role?.includes (user.role)) {
      next();
    }else{
      res.status(403).json("You are unauthorized!")
    }
  }
};
export const isDoctorAuthorized = (role) => {
  return async (req, res, next) => {
    const user = await DoctorModel.findById(req.auth.id);
    if (role?.includes (user.role)) {
      next();
    }else{
      res.status(403).json("You are unauthorized!")
    }
  }
};

export const isAuthorized = (role) => {
  return async (req, res, next) => {
    // Try to find in user model first
    let user = await UserModel.findById(req.auth.id);
    
    // If not found in users, try doctors
    if (!user) {
      user = await DoctorModel.findById(req.auth.id);
    }
    
    // If still not found
    if (!user) {
      return res.status(404).json("User not found");
    }
    
    if (role?.includes(user.role)) {
      next();
    } else {
      res.status(403).json("You are unauthorized!");
    }
  }
};