import Joi from "joi"

export const userValidationSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required'
    }),
    
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required'
    }),
    
  firstname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'First name must be at least 2 characters',
      'string.max': 'First name cannot exceed 50 characters',
      'string.empty': 'First name cannot be empty',
      'any.required': 'First name is required'
    }),
    
  lastname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Last name must be at least 2 characters',
      'string.max': 'Last name cannot exceed 50 characters',
      'string.empty': 'Last name cannot be empty',
      'any.required': 'Last name is required'
    }),
    
  image: Joi.string()
    .messages({
      'string.empty': 'Image URL cannot be empty',
    }),
    
  phone: Joi.string()
    .pattern(new RegExp('^[0-9]{10,15}$'))
    .required()
    .messages({
      'string.pattern.base': 'Phone number must contain 10-15 digits only',
      'string.empty': 'Phone number cannot be empty',
      'any.required': 'Phone number is required'
    }),
    
  role: Joi.string()
    .valid('user')
    .default('user')
    .messages({
      'any.only': 'Role must be  "user" '
    }),
    emergencycontact: Joi.string()
    .pattern(new RegExp('^[0-9]{10,15}$'))
    .messages({
      'string.pattern.base': 'Emergency contact must contain 10-15 digits only',
      'string.empty': 'Emergency contact cannot be empty'
    }),
    gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': 'Gender must be either "male", "female", or "other"',
      'any.required': 'Gender is required'
    }),
    age: Joi.number()
    .integer()
    .min(0)
    .max(120)
    .messages({
      'number.base': 'Age must be a number',
      'number.integer': 'Age must be an integer',
      'number.min': 'Age cannot be negative',
      'number.max': 'Age cannot exceed 120',
    }),
    
  medicalHistory: Joi.string()
    .allow(''),
    
  allergies: Joi.string(),
})

export const loginUserValidator = Joi.object ({
  email : Joi.string().required(),
  password: Joi.string().required(),
})
