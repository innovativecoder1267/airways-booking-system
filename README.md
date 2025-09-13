Backend (airways-booking-backend/README.md)
# Airways Booking System - Backend

This is the **backend** of the Airways Booking System, built with **Node.js, Express, and MongoDB**.  
It handles user authentication, flight booking, and API endpoints for the frontend.

---

## 🚀 Features
- User authentication (Register/Login/Logout)
- Flight booking APIs
- Secure password storage with bcrypt
- MongoDB database integration
- Error handling and validations

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/airways-booking-backend.git
   cd airways-booking-backend


Install dependencies:

npm install


Create a .env file in the root folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Start the backend server:

npm run dev


The server will run on http://localhost:5000.

📡 API Endpoints

POST /customer/register → Register a new user

POST /customer/login → Login user

POST /customer/logout → Logout user

POST /booking/create → Book a flight

GET /booking/:id → Get booking details
