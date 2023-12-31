import express from 'express';
import { Request, Response, Router } from 'express';

const router: Router = Router();

import UserRouter from './admin/user.routes'
import CardRouter from './card/card.router'

router.use('/users', UserRouter);
router.use('/cards', CardRouter);

export default router;
