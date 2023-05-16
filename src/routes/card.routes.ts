import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import jwtFunctions from '../jwt/jwt.functions';
import Card from '../models/card.model';

const router = express.Router();

// create card

router.post('/create', jwtFunctions.verifyJWT, (req: Request, res: Response) => {
    const { name, card_type, type, description, effect, image, admin } = req.body;
    if (!admin)
        res.status(400).json({ error: 'You are not admin' });
    Card.create({
        name,
        card_type,
        type,
        description,
        effect,
        image
    })
        .then(card => {
            res.status(200).json({ card });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

export default router;