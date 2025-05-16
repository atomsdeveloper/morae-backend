import { Router } from "express";
const router = new Router();

// Middleware
import loginRequired from "../middleware/loginRequired.js";
import adminRequired from "../middleware/adminRequired.js";

// Controller
import ReservesController from "../controllers/reservesController.js";

// Routes
router.get("/", loginRequired, ReservesController.index);
router.get("/:id", loginRequired, ReservesController.show);

router.post("/create", loginRequired, adminRequired, ReservesController.store);
router.put(
  "/:id/edit",
  loginRequired,
  adminRequired,
  ReservesController.update
);
router.delete(
  "/:id/delete",
  loginRequired,
  adminRequired,
  ReservesController.delete
);

export default router;

/*
 index -> List all users -> GET
 show -> Show a user  -> GET
 store -> Create a user -> POST
 update -> Update a user -> PUT
 delete -> Delete a user -> DELETE
*/
