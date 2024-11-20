import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from './Kanbas/Courses/routes.js';
import "dotenv/config";
import session from "express-session";
import ModuleRoutes from './Kanbas/Modules/routes.js';
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from './Kanbas/Courses/Assignments/routes.js';
const app = express();
const allowedOrigins = [
    process.env.NETLIFY_URL || "https://kanbas-react-web-app-cs5610-fa24-a5.netlify.app", // Production frontend URL
    "http://localhost:3000", // Local development
];

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app); 

Hello(app)
Lab5(app);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});