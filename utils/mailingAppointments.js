import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service : "gmail",
  port : 587,
  secure : false,
  auth : {
    user : process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
});

export const sendEmailSignup = async (to, subject, firstname, role) => {
  const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Appointment is Confirmed - MedicPlus</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eaeaea;
        }
        .logo {
            width: 180px;
            height: auto;
        }
        .content {
            padding: 20px 0;
        }
        h1 {
            color: #0066cc;
            margin-top: 0;
        }
        h2 {
            color: #0066cc;
            font-size: 18px;
            margin-top: 25px;
        }
        .appointment-box {
            background-color: #f0f7ff;
            border-left: 4px solid #0066cc;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .appointment-detail {
            margin-bottom: 8px;
        }
        .appointment-detail strong {
            display: inline-block;
            width: 120px;
        }
        .button {
            display: inline-block;
            background-color: #0066cc;
            color: white;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            margin: 5px 10px 5px 0;
            font-weight: bold;
            text-align: center;
        }
        .button.secondary {
            background-color: #ffffff;
            color: #0066cc;
            border: 1px solid #0066cc;
        }
        .button:hover {
            background-color: #004d99;
        }
        .button.secondary:hover {
            background-color: #f0f7ff;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 12px;
            color: #777;
        }
        .doctor-profile {
            display: flex;
            align-items: center;
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #eaeaea;
            border-radius: 8px;
        }
        .doctor-image {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .doctor-info {
            flex-grow: 1;
        }
        .doctor-name {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 5px;
        }
        .action-buttons {
            margin: 25px 0;
        }
        .map {
            width: 100%;
            height: 150px;
            background-color: #eaeaea;
            margin: 15px 0;
            border-radius: 4px;
        }
        .reminder {
            background-color: #fff4e5;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .calendar-icon {
            text-align: center;
            margin: 20px 0;
        }
        .calendar-date {
            font-size: 30px;
            font-weight: bold;
            color: #0066cc;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="/api/placeholder/180/60" alt="MedicPlus Logo" class="logo" />
        </div>
        
        <div class="content">
            <h1>Your Appointment is Confirmed!</h1>
            <p>Hello {{patient_name}},</p>
            <p>Thank you for booking your appointment with MedicPlus. Your health is our priority, and we're here to provide you with excellent care.</p>
            
            <div class="calendar-icon">
                <img src="/api/placeholder/60/60" alt="Calendar" />
                <div class="calendar-date">{{appointment_day}}</div>
                <div>{{appointment_month}}</div>
            </div>
            
            <div class="appointment-box">
                <h3>Appointment Details</h3>
                <div class="appointment-detail">
                    <strong>Date:</strong> {{appointment_date}}
                </div>
                <div class="appointment-detail">
                    <strong>Time:</strong> {{appointment_time}}
                </div>
                <div class="appointment-detail">
                    <strong>Duration:</strong> {{appointment_duration}} minutes
                </div>
                <div class="appointment-detail">
                    <strong>Type:</strong> {{appointment_type}}
                </div>
                <div class="appointment-detail">
                    <strong>Reason:</strong> {{appointment_reason}}
                </div>
                <div class="appointment-detail">
                    <strong>Location:</strong> {{clinic_address}}
                </div>
                <div class="appointment-detail">
                    <strong>Fee:</strong> ${consultation_fee}
                </div>
            </div>
            
            <div class="doctor-profile">
                <img src="/api/placeholder/80/80" alt="Dr. {{doctor_name}}" class="doctor-image" />
                <div class="doctor-info">
                    <div class="doctor-name">Dr. {{doctor_name}}</div>
                    <div>{{doctor_specialization}}</div>
                    <div>Experience: {{doctor_experience}} years</div>
                    <div>{{doctor_qualifications}}</div>
                </div>
            </div>
            
            <div class="map">
                <!-- Map placeholder -->
                <img src="/api/placeholder/600/150" alt="Clinic Location" style="width:100%; height:100%; object-fit:cover; border-radius:4px;" />
            </div>
            
            <div class="action-buttons">
                <a href="{{reschedule_url}}" class="button secondary">Reschedule Appointment</a>
                <a href="{{cancel_url}}" class="button secondary">Cancel Appointment</a>
                <a href="{{add_to_calendar_url}}" class="button">Add to Calendar</a>
            </div>
            
            <div class="reminder">
                <h3>Appointment Preparation</h3>
                <p>For the best experience, please:</p>
                <ul>
                    <li>Arrive 15 minutes before your scheduled time</li>
                    <li>Bring your health insurance card and ID</li>
                    <li>Prepare a list of current medications and medical history</li>
                    <li>Bring any relevant medical records or test results</li>
                </ul>
            </div>
            
            <h2>Need to Make Changes?</h2>
            <p>If you need to reschedule or cancel your appointment, please do so at least 24 hours in advance by clicking the appropriate button above or calling us at {{clinic_phone}}.</p>
            
            <p>We look forward to seeing you and addressing your healthcare needs!</p>
            
            <p>Best regards,<br>The MedicPlus Team</p>
        </div>
        
        <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>If you have any questions about your appointment, please contact us at <a href="mailto:support@medicplus.com">support@medicplus.com</a>.</p>
            <p>&copy; 2025 MedicPlus. All rights reserved.</p>
            <p>{{company_address}}</p>
            <p><small>Your privacy is important to us. All medical information is kept confidential in accordance with HIPAA regulations.</small></p>
        </div>
    </div>
</body>
</html>
`

const send = await transporter.sendMail (
  { from : process.env.USER_EMAIL,
    to : to,
    subject: subject,
    html : emailTemplate
  }
)
console.log ("email sent", send)
}