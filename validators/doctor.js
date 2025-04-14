import Joi from 'joi';


export const doctorValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  age: Joi.number().integer().min(0).optional(),
  role: Joi.string()
      .valid('doctor')
      .default('doctor')
      .messages({
        'any.only': 'Role must be  "doctor" '
      }),
  specialization: Joi.string().required(),
  licenseNumber: Joi.string().required(),
  qualifications: Joi.array().items(Joi.string()).required(),
  image: Joi.string().required(),
  experience: Joi.number().integer().min(0).required(),
  consultationFee: Joi.number().min(0).required()
});

export const loginDoctorValidator = Joi.object ({
  email : Joi.string().required(),
  password: Joi.string().required(),
})


