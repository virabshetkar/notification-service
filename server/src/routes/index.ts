import { Router } from "express";
import notificationsRoute from "./notificaitons.route";

const router = Router();

router.use("/notifications", notificationsRoute);

export default router;
