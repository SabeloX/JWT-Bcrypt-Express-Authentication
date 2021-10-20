import controllers from '../controllers';
import { Router } from 'express';

// instance of router for chain of routes
const router = Router()

router.post('/register', controllers.register);
router.post('/login', controllers.login);

export default router;