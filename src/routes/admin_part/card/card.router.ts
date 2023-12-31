import express from 'express';
import { Request, Response, Router } from 'express';

const router: Router = Router();

import MonsterCardRouter from './monster.card.routes'
import SpellCardRouter from './spell.card.routes'
import TrapCardRouter from './trap.card.routes'

router.use('/monsters', MonsterCardRouter);
router.use('/spells', SpellCardRouter);
router.use('/traps', TrapCardRouter);

export default router;