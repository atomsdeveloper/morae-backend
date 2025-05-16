import { Router } from "express";
const router = new Router();

// Multer
import multer from "multer";
import multerConfig from "../config/multer.js";

// Controller
import PhotoController from "../controllers/photoController.js";

// Middleware
import loginRequired from "../middleware/loginRequired.js";

const upload = multer(multerConfig);

// Route
router.post("/", upload.single("file"), loginRequired, PhotoController.store);

export default router;

/*
 index -> List all Students -> GET
 show -> Show a Student  -> GET
 store -> Create a Student -> POST
 update -> Update a Student -> PUT
 delete -> Delete a Student -> DELETE
*/
