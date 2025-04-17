import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"
import userRouter from "./routes/user.js";
import doctorRouter from "./routes/doctor.js";
import appointmentRouter from "./routes/appointment.js";






await mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());

// app.use(productRouter);
app.use(userRouter)
app.use(doctorRouter)
app.use(appointmentRouter);



const port = process.env.PORT || 3001
app.listen(port, ()=> {
  console.log( `Server is listening on port ${port}`)
})

