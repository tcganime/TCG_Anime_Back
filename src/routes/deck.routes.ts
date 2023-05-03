import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import jwtFunctions from '../jwt/jwt.functions';
import Deck from '../models/deck.model';

const router = express.Router();

// get user decks

router.get('/', jwtFunctions.verifyJWT, (req: Request, res: Response) => {
    const id = req.body.id;
    const decks = Deck.findAll({ where: { user_id: id } }).then((decks: Deck[] | null) => {
        if (decks === null)
            res.status(200).json({ 'decks': [] });
        else
            res.status(200).json({ 'decks': decks });
    }).catch((err: Error) => {
        res.status(400).json({ error: err.message });
    });
});

// create deck

router.get('/create', jwtFunctions.verifyJWT, (req: Request, res: Response) => {
    const { name, composition, id } = req.body;
    Deck.create({ name, composition, user_id: id }).then((deck: Deck) => {
        res.status(201).json({ 'message': 'Deck created' });
    }).catch((err: Error) => {
        res.status(400).json({ error: err.message });
    });
});

// delete deck
router.get('/delete', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id } = req.body;
    let deck: Deck | null = await Deck.findOne({ where: { id } });
    if (deck === null)
        res.status(400).json({ error: 'Deck not found' });
    else {
        deck.destroy().then(() => {
            res.status(200).json({ 'message': 'Deck deleted' });
        }).catch((err: Error) => {
            res.status(400).json({ error: err.message });
        });
    }
});

export default router