import controllers from '../controllers';
import { Router } from 'express';

// instance of router for chain of routes
const router = Router()

router.post('/register', controllers.register);