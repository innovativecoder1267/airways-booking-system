# airways-booking-system
End-to-end flight reservation system with real-time flight search, secure payment gateway, booking history, and automated ticket emails.
A full-stack flight booking system built with Node.js, Express, MongoDB, and React.
This project demonstrates a complete airline booking workflow, including authentication, flight search, bookings, payment integration, and ticket confirmation.

 Features:

Secure User Authentication with JWT

Flight Search by origin, destination, date, passengers

Booking System with seat availability and pricing

Razorpay Payment Integration (test mode)

My Bookings section to view past reservations

Email Notifications with ticket details

📂 Tech Stack

Frontend: React, Vite, Bootstrap

Backend: Node.js, Express.js

Database: MongoDB

Payments: Razorpay Integration

Other: JWT Authentication, Nodemailer

🔄 Project Flow

User logs in or registers

Searches for available flights

Selects a flight and proceeds to booking

Payment completed via Razorpay popup

Booking stored in database

User can view bookings in My Bookings

Ticket sent via email

🛠️ Setup Instructions

Clone the repo:

git clone https://github.com/<your-username>/airways-booking-system.git
cd airways-booking-system


Install dependencies:

cd backend && npm install  
cd frontend && npm install  


Add environment variables in .env:

MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  
RAZORPAY_KEY_ID=your_key  
RAZORPAY_SECRET=your_secret  
EMAIL_USER=your_email  
EMAIL_PASS=your_email_password  


Run backend:

npm start


Run frontend:

npm run dev


Open app:

http://localhost:5174
