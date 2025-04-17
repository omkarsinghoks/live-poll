# 🗳️ LivePoll - Real-Time Polling Application

A full-stack MERN web app that allows users to create, vote on, and view live polls with real-time chart updates.

---

## 📸 Screenshots



![Screenshot](https://drive.google.com/uc?id=1L5GV02KJPWAA3w7mRURBvQt4RfWePVSF)
![Screenshot](https://drive.google.com/uc?id=1AKPNk4zQI45x6eA2P0uai_N3ZTys142d)
![Screenshot](https://drive.google.com/uc?id=1zaICKab0vSLRKYNA6RKsRAmbT3TAwsnO)
![Screenshot](https://drive.google.com/uc?id=13nuyPeQfB0fZZ2AgMhv2t1_dPrmm97ZC)
![Screenshot](https://drive.google.com/uc?id=1i48gQGfP5dBuHJpLYhds8pgtof2J4Saj)
![Screenshot](https://drive.google.com/uc?id=1H9RCIdVfVCNX41Civy-vDF8-GPeY9TCV)
![Screenshot](https://drive.google.com/uc?id=1TQRy35iCCx5_8jtqHkMqFU48x0saS3-H)

---

## 🚀 Features

- **Authentication**
  - Signup/Login with JWT
  - Validations and protected routes
- **Poll System**
  - Create, vote, delete polls
  - Live chart updates via Socket.io
- **Modern UI**
  - Fully responsive with Tailwind CSS + DaisyUI
- **Optimized UX**
  - Toast notifications, loading states, React Query caching

---

## 🛠 Tech Stack

**Frontend:** React.js, React Router, React Query, Tailwind CSS, DaisyUI, Chart.js  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Socket.io

---

## ⚙️ Requirements

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

---

## 🔧 Complete Setup (All-in-One)

Follow these exact steps to run the full project locally:

```bash
# 1. Clone the repository
git clone https://github.com/omkarsinghoks/live-poll.git
cd LivePoll

# 2. Install backend dependencies
cd backend
npm install

# 3. Create backend .env file
# Replace placeholder values with your actual config
echo "PORT=3000
DB_CONNECTION=your_mongodb_connection_url
SALT_ROUNDS=6
JWT_PRIVATE=your_jwt_secret
CLIENT_URL=http://localhost:5173" > .env

# 4. Start backend server
npm run dev

### 💻 Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install

# Create a .env file and add your backend URL
# Example:
echo "VITE_BACKEND_URL=http://localhost:3000" > .env

# Start the frontend development server
npm start
## 🛠️ Quick Setup Guide

1. Clone the repository  
   `git clone https://github.com/omkarsinghoks/live-poll.git`

2. Move into the project folder  
   `cd LivePoll`

3. Go into the backend folder and install dependencies  
   `cd backend`  
   `npm install`

4. Create a `.env` file inside the backend folder and add the following:
PORT=3000
DB_CONNECTION=your_mongodb_url
SALT_ROUNDS=6
JWT_PRIVATE=your_jwt_secret
CLIENT_URL=http://localhost:5173

5. Now go to the frontend folder  
`cd ../frontend`

6. Install frontend dependencies  
`npm install`

7. Create a `.env` file inside the frontend folder and add:
VITE_BACKEND_URL=http://localhost:3000

8. ✅ You're all set!  
Run the backend and frontend servers and test your project in the browser at:  
[http://localhost:3000](http://localhost:5173)



