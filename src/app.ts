import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());    //Convert incoming JSON data into JavaScript object.
app.use(express.urlencoded({ extended: true }));    // Allow Express to access/read form data sent from frontend.

app.use(cookieParser());    // To access cookies from the request object (req.cookies)

app.use(cors({
    origin: process.env.CORS_FRONTEND_URL || 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


// Importing routes
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';


// Using user routes

app.use("/api/v1/users", userRoutes);


//Using todo routes

app.use("/api/v1/todos", todoRoutes);

export default app;
