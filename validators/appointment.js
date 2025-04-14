import Joi from 'joi';


export const appointmentValidationSchema = Joi.object({
  patientId: Joi.string().required()
    .messages({
      'any.required': 'Patient ID is required',
    }),
    
  doctorId: Joi.string().required()
    .messages({
      'any.required': 'Doctor ID is required',
    }),
    
  date: Joi.date()
    .min('now')
    .required()
    .messages({
      'date.base': 'Please provide a valid date',
      'date.min': 'Appointment date cannot be in the past',
      'any.required': 'Appointment date is required'
    }),
    
  time: Joi.string()
    .pattern(new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$'))
    .required()
    .messages({
      'string.pattern.base': 'Time must be in HH:MM format (24-hour)',
      'string.empty': 'Appointment time cannot be empty',
      'any.required': 'Appointment time is required'
    }),
    
  status: Joi.string()
    .valid('scheduled', 'completed', 'cancelled')
    .default('scheduled')
    .messages({
      'any.only': 'Status must be one of: scheduled, completed, cancelled'
    }),
    
  notes: Joi.string()
    .allow('')
    .max(500)
    .messages({
      'string.max': 'Notes cannot exceed 500 characters'
    })
});
