import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { CLIENT_URL, PORT } from './config/veriables.js';
import { connectDB } from './config/dbConfig.js';
import userRouter from './routes/v1/user.route.js';
import swaggerDocs from '../swagger.js';
import swaggerUi from 'swagger-ui-express';
import cookieParser from "cookie-parser";
import pollRouter from './routes/v1/poll.route.js';
import { handlePollSocket } from './socket/poll.socket.js';
import voteRouter from './routes/v1/vote.route.js';

const app = express();

// CORS Middleware
// import cors from "cors";

app.use(cors({
  origin: ["http://localhost:5173", "https://live-poll-vwg3.vercel.app"], // Allow both local and deployed frontend
  credentials: true, // Allow cookies to be sent with requests
}))

// Middleware
app.use(cookieParser());
app.use(express.json());

// Swagger Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Socket.io Configuration
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL, // Ensure CLIENT_URL is set correctly in your .env file
    credentials: true,
  },
});
handlePollSocket(io);

// Routes
app.use("/api/v1/poll", pollRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/vote", voteRouter);

// Database Connection
await connectDB();

// Start Server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

