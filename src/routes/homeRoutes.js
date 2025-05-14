import { Router } from "express";
const router = new Router();

// Controller
import HomeController from "../controllers/homeController.js";

router.get("/", HomeController.index);

export default router;

/*
 index -> List all Students -> GET
 show -> Show a Student  -> GET
 store -> Create a Student -> POST
 update -> Update a Student -> PUT
 delete -> Delete a Student -> DELETE
*/
