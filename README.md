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

To run this project locally, you need to have the following installed:

- Node.js (v16+)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

---

## 🔧 Complete Setup (All-in-One)

Follow these exact steps to run the full project locally on your machine.

### Step-by-Step Setup

First, **clone the repository** using:

```bash
git clone https://github.com/omkarsinghoks/live-poll.git
cd LivePoll
Now, navigate into the backend folder and install all the required dependencies:



cd backend
npm install
Then, create a .env file inside the backend folder and add the following environment variables:

env


PORT=3000
DB_CONNECTION=your_mongodb_connection_url
SALT_ROUNDS=6
JWT_PRIVATE=your_jwt_secret
CLIENT_URL=http://localhost:5173
Start the backend server:



npm run dev
💻 Frontend Setup
Navigate to the frontend directory:

cd ../frontend
Install the frontend dependencies:



npm install
Now create a .env file inside the frontend folder and add your backend URL:

env

VITE_BACKEND_URL=http://localhost:3000
Start the frontend development server:

bash

npm start
🛠️ Quick Setup Guide
Clone the repository:


git clone https://github.com/omkarsinghoks/live-poll.git
Move into the project folder:


cd LivePoll
Go into the backend folder and install dependencies:


cd backend
npm install
Create a .env file in the backend folder and add:


PORT=3000
DB_CONNECTION=your_mongodb_url
SALT_ROUNDS=6
JWT_PRIVATE=your_jwt_secret
CLIENT_URL=http://localhost:5173
Navigate to the frontend folder:


cd ../frontend
Install frontend dependencies:


npm install
Create a .env file in the frontend folder and add:


VITE_BACKEND_URL=http://localhost:3000
✅ You're all set!
Run both backend and frontend servers. Visit your app in the browser at:
http://localhost:5173

🔁 State Sharing & Room Management Architecture
The application implements real-time vote synchronization using a pub/sub model with WebSocket (Socket.io) connections.

🧠 How It Works
Each poll corresponds to a unique room, identified by the poll's MongoDB _id.

When a user casts a vote:

The frontend sends the vote to the backend via Socket.io.

The backend validates the vote.

The vote is persisted to MongoDB.

Updated poll results are broadcast to all users in the same room.

An in-memory cache (Redis) is used to store and manage active room state.

✅ Key Benefits
Real-time Synchronization: Votes instantly reflect across all connected clients.

Scalable Architecture: Redis supports horizontal scaling across instances.

Efficient Room Management: Inactive rooms are auto-cleaned on poll expiration.

Reliable Data Source: MongoDB acts as the single source of truth.

Smooth UX: Frontend uses React Query for optimistic updates, ensuring immediate visual feedback while syncing with the backend.

This setup guarantees both performance and consistency in high-traffic, real-time voting scenarios.

vbnet


Let me know if you'd like this exported as a `.md` file or uploaded somewhere!
