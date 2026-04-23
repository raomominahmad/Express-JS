import express from "express";
import cors from "cors";

const app = express();

// basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.get("/", (req, res) => {
  res.send("Welcome to basecampy");
});

// cors configuration
// ? optional chaining
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || `http://localhost:5173`,
    credentials: true, // cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// import the routes

import healthCheckRouter from "./routes/healthcheck.route.js"
import authRouter from "./routes/auth.routes.js"

app.use("/api/v1/healthcheck" , healthCheckRouter)
app.use("/api/v1/auth",authRouter)

// app.get("/test-email", async (req, res) => {
//   await sendEmail({
//     email: "test@example.com", // can be anything
//     subject: "Test Email",
//     mailgenContent: {
//       body: {
//         name: "Momin",
//         intro: "Welcome to Task Manager!",
//         outro: "Need help? Reply to this email."
//       }
//     }
//   });

//   res.send("Email sent");
// });

export default app;
