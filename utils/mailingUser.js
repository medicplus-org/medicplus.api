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
    <title>Welcome to MedicPlus</title>
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
        .button {
            display: inline-block;
            background-color: #0066cc;
            color: white;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
        }
        .button:hover {
            background-color: #004d99;
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
            color: #0066cc;
            text-decoration: none;
        }
        .feature {
            margin-bottom: 15px;
        }
        .feature img {
            width: 50px;
            height: 50px;
            float: left;
            margin-right: 15px;
        }
        .feature-content {
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="/api/placeholder/180/60" alt="MedicPlus Logo" class="logo" />
        </div>
        
        <div class="content">
            <h1>Welcome to MedicPlus!</h1>
            <p>Hello ${firstname},</p>
            <p>Thank you for joining MedicPlus, your trusted healthcare partner. We're excited to have you on board and look forward to providing you with quality healthcare services.</p>
            
            <h2>Getting Started</h2>
            <p>Here's how you can make the most of our platform as a ${role}:</p>
            
            <div class="feature">
                <img src="/api/placeholder/50/50" alt="Book Appointment" />
                <div class="feature-content">
                    <strong>Book Appointments</strong>
                    <p>Easily schedule consultations with specialists based on your healthcare needs. Our intuitive booking system allows you to choose appointments that fit your schedule.</p>
                </div>
            </div>
            
            <div class="feature">
                <img src="/api/placeholder/50/50" alt="Browse Doctors" />
                <div class="feature-content">
                    <strong>Browse Our Specialists</strong>
                    <p>Explore our network of qualified healthcare professionals. View their specializations, qualifications, experience, and consultation fees to make informed decisions.</p>
                </div>
            </div>
            
            <div class="feature">
                <img src="/api/placeholder/50/50" alt="Services" />
                <div class="feature-content">
                    <strong>Discover Our Services</strong>
                    <p>From general consultations to specialized treatments, we offer a wide range of healthcare services designed to meet your needs.</p>
                </div>
            </div>
            
            <a href="{{dashboard_url}}" class="button">Access Your Dashboard</a>
            
            <h2>Need Help?</h2>
            <p>If you have any questions or need assistance, our support team is always ready to help. Feel free to reach out to us at <a href="mailto:support@medicplus.com">support@medicplus.com</a> or call us at {{support_phone}}.</p>
            
            <p>We're committed to making your healthcare journey as smooth and convenient as possible.</p>
            
            <p>Best regards,<br>The MedicPlus Team</p>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="{{facebook_url}}">Facebook</a>
                <a href="{{twitter_url}}">Twitter</a>
                <a href="{{instagram_url}}">Instagram</a>
            </div>
            <p>&copy; 2025 MedicPlus. All rights reserved.</p>
            <p>{{company_address}}</p>
            <p><small>If you did not sign up for MedicPlus, please disregard this email.</small></p>
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