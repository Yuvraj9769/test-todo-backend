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



app.get("/", (req, res) => {
    res.send("Welcome to the Todo App API");
});


app.get("/api/v1/dummy", (req, res) => {
    res.json({ message: "This is a dummy route for testing purposes.", timestamp: new Date(), data: {
        {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com"
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "janesmith@gmail.com"
            },
             {
                id: 3,
                name: "Alice Johnson",
                email: "alice.johnson@example.com"
             },
             {
                id: 4,
                name: "Bob Brown",
                email: "bob.brown@example.com"
             },
             {
                id: 5,
                name: "Charlie Davis",
                email: "charlie.davis@example.com"
             },
             {
                id: 6,
                name: "Eve Wilson",
                email: "eve.wilson@example.com"
             },
                {
                id: 7,
                name: "Frank Miller",
                email: "frank.miller@example.com"
             },
                {
                id: 8,
                name: "Grace Lee",
                email: "grace.lee@example.com"
             },
             {
                id: 9,
                name: "Hank Green",
                email: "hank.green@example.com"
             },
             {
                id: 10,
                name: "Ivy Turner",
                email: "ivy.turner@example.com"
             },
    } });
}


// Importing routes
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';


// Using user routes

app.use("/api/v1/users", userRoutes);


//Using todo routes

app.use("/api/v1/todos", todoRoutes);

export default app;
