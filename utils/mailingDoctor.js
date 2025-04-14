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

export const sendEmailSignup = async (to, subject,name) => {
  const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MedicPlus - Healthcare Provider Portal</title>
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
            color: #00538b;
            margin-top: 0;
        }
        h2 {
            color: #00538b;
            font-size: 18px;
            margin-top: 25px;
        }
        .button {
            display: inline-block;
            background-color: #00538b;
            color: white;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
        }
        .button:hover {
            background-color: #003d66;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 12px;
            color: #777;
        }
        .social-links {
            margin: 15px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #00538b;
            text-decoration: none;
        }
        .feature {
            margin-bottom: 20px;
            display: flex;
            align-items: flex-start;
        }
        .feature img {
            width: 60px;
            height: 60px;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .feature-content {
            flex-grow: 1;
        }
        .stats {
            display: flex;
            justify-content: space-between;
            margin: 25px 0;
            text-align: center;
        }
        .stat-item {
            flex: 1;
            padding: 15px 10px;
            background-color: #f2f8fc;
            border-radius: 6px;
            margin: 0 5px;
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #00538b;
            display: block;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="/api/placeholder/180/60" alt="MedicPlus Logo" class="logo" />
        </div>
        
        <div class="content">
            <h1>Welcome to the MedicPlus Professional Network!</h1>
            <p>Dear Dr. ${name},</p>
            <p>We are thrilled to welcome you to the MedicPlus healthcare provider network. Your expertise in {{specialization}} will be a valuable addition to our platform. We've designed our provider portal with your needs in mind, making patient management seamless and efficient.</p>
            
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-number">{{user_count}}</span>
                    <span>Active Users</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">{{doctor_count}}</span>
                    <span>Specialists</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">{{appointment_count}}</span>
                    <span>Daily Appointments</span>
                </div>
            </div>
            
            <h2>Your Provider Dashboard Features</h2>
            
            <div class="feature">
                <img src="/api/placeholder/60/60" alt="Appointment Management" />
                <div class="feature-content">
                    <strong>Appointment Management</strong>
                    <p>Efficiently manage your schedule with our intuitive calendar interface. View upcoming appointments, set availability, reschedule sessions, and send automated reminders to patients.</p>
                </div>
            </div>
            
            <div class="feature">
                <img src="/api/placeholder/60/60" alt="Service Updates" />
                <div class="feature-content">
                    <strong>Service & Profile Updates</strong>
                    <p>Easily update your professional profile, add new services, adjust consultation fees, and showcase your qualifications and expertise to potential patients.</p>
                </div>
            </div>
            
            <div class="feature">
                <img src="/api/placeholder/60/60" alt="Patient Communication" />
                <div class="feature-content">
                    <strong>Patient Communication</strong>
                    <p>Securely communicate with your patients through our HIPAA-compliant messaging system. Share important information, follow up on treatments, and build stronger doctor-patient relationships.</p>
                </div>
            </div>
            
            <div class="feature">
                <img src="/api/placeholder/60/60" alt="Analytics" />
                <div class="feature-content">
                    <strong>Performance Analytics</strong>
                    <p>Access detailed insights about your practice, including appointment statistics, patient demographics, and satisfaction ratings to help you optimize your services.</p>
                </div>
            </div>
            
            <a href="{{dashboard_url}}" class="button">Access Your Provider Dashboard</a>
            
            <h2>Getting Started</h2>
            <p>To make the most of your MedicPlus experience, we recommend:</p>
            <ol>
                <li>Complete your professional profile with detailed credentials and a professional photo</li>
                <li>Set up your availability calendar for the upcoming weeks</li>
                <li>Review and customize your service offerings and consultation fees</li>
                <li>Explore the dashboard features and familiarize yourself with the patient management tools</li>
            </ol>
            
            <h2>Need Assistance?</h2>
            <p>Our dedicated provider support team is available to help you with any questions. Contact us at <a href="mailto:provider-support@medicplus.com">provider-support@medicplus.com</a> or call our provider hotline at {{support_phone}}.</p>
            
            <p>We're excited to partner with you in delivering exceptional healthcare services.</p>
            
            <p>Warm regards,<br>The MedicPlus Provider Relations Team</p>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="{{facebook_url}}">Facebook</a>
                <a href="{{linkedin_url}}">LinkedIn</a>
                <a href="{{twitter_url}}">Twitter</a>
            </div>
            <p>&copy; 2025 MedicPlus. All rights reserved.</p>
            <p>{{company_address}}</p>
            <p><small>This email contains confidential information intended for healthcare providers.</small></p>
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