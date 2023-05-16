import express, { Request, Response } from 'express';
import jwtFunctions from '../jwt/jwt.functions';
import Archetypes from '../models/archetypes.models';

const router = express.Router();

// create archetype

router.post('/create', jwtFunctions.verifyJWT, (req: Request, res: Response) => {
    const { name, admin } = req.body;
    if (!admin)
        res.status(400).json({ error: 'You are not admin' });
    Archetypes.create({
        name
    })
        .then(archetype => {
            res.status(200).json({ archetype });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

export default router;