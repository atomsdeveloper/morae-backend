import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

import cors from "cors";

import { resolve } from "path";
import express from "express";

// Importing the database connection
import "./src/database/index.js";

// Routes
import homeRoute from "./src/routes/homeRoutes.js";
import tokenRoute from "./src/routes/tokenRoutes.js";
import userRoute from "./src/routes/userRoutes.js";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://localhost:5173",
    "ws://localhost:5173",
    "wss://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Content-Security-Policy",
        "default-src 'self'; connect-src 'self' http://localhost:5173 https://seu-dominio.vercel.app; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https: data:; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
      );

      next();
    });
    this.app.use(cors(corsOptions));
    // this.app.use(helmet(helmetOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, "uploads")));
  }

  routes() {
    this.app.use("/", homeRoute);
    this.app.use("/token", tokenRoute);
    this.app.use("/users", userRoute);
  }
}

// Exporting the instance of App
// This allows us to use the same instance across the application
export default new App().app;
