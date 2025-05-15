import { Router } from "express";
const router = new Router();

// Controller
import TokenController from "../controllers/tokenController.js";

router.get("/", TokenController.store);

export default router;

/*
 index -> List all Students -> GET
 show -> Show a Student  -> GET
 store -> Create a Student -> POST
 update -> Update a Student -> PUT
 delete -> Delete a Student -> DELETE
*/
