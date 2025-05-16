import { Router } from "express";
const router = new Router();

// Middleware
import loginRequired from "../middleware/loginRequired.js";
import adminRequired from "../middleware/adminRequired.js";

// Controller
import UserController from "../controllers/userController.js";

// Routes
router.get("/", loginRequired, adminRequired, UserController.index);
router.get("/:id", loginRequired, adminRequired, UserController.show);

router.post("/create", loginRequired, adminRequired, UserController.store);
router.put("/:id/edit", loginRequired, UserController.update);
router.delete("/:id/delete", loginRequired, UserController.delete);

export default router;

/*
 index -> List all users -> GET
 show -> Show a user  -> GET
 store -> Create a user -> POST
 update -> Update a user -> PUT
 delete -> Delete a user -> DELETE
*/
