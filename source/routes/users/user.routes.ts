import { Router } from "express";
import controllers from '../../controllers';

const router = Router();

router
    .get('/', controllers.getUsers)
    .get('/:username', controllers.getUser)

export default router;