import { Router } from "express";
import controllers from '../controllers';
import middleware from "../middleware";

const router = Router();

router
    .get('/', middleware.verifyToken, controllers.getUsers)
    .get('/:username', middleware.verifyToken, controllers.getUser)

export default router;