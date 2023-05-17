import express, { Request, Response } from 'express';
import jwtFunctions from '../jwt/jwt.functions';
import MonsterCard from '../models/monster_card.model';
import SpellCard from '../models/spell_card.model';
import TrapCard from '../models/trap_card.model';

const router = express.Router();

// create MonsterCard

router.post('/create/monster', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    let { admin, name, archetypes, level, atk, def, attribute, card_type, monster_type, description, image_url, effect } = req.body;
    console.log(req.body)
    if (!admin)
        res.status(400).json({ error: 'You are not admin' });
    let spell : SpellCard | null = await SpellCard.findOne({where: {name}})
    let trap : TrapCard | null = await TrapCard.findOne({where: {name}})
    if (spell || trap)
        res.status(400).json({ error: 'This card already exist and it is a' + (spell ? ' spell' : ' trap') + ' card' })
    MonsterCard.create({
        name,
        archetypes,
        level,
        atk,
        def,
        attribute,
        card_type,
        monster_type,
        description,
        image_url,
        effect
    })
        .then(monster => {
            res.status(201).json({'message': 'Monster card created !', 'monster': monster})
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

// create SpellCard

router.post('/create/spell', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    let { name, archetypes, description, image_url, type, effect, admin } = req.body;
    if (!admin)
        res.status(400).json({ error: 'You are not admin' });
    let monster : MonsterCard | null = await MonsterCard.findOne({where: {name}})
    let trap : TrapCard | null = await TrapCard.findOne({where: {name}})
    if (monster || trap)
        res.status(400).json({ error: 'This card already exist and it is a' + (monster ? ' monster' : ' trap') + ' card' })
    SpellCard.create({
        name,
        archetypes,
        description,
        image_url,
        type,
        effect
    })
        .then(spell => {
            res.status(200).json({ spell });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
})

// create TrapCard

router.post('/create/trap', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    let { name, archetypes, description, image_url, type, effect, admin } = req.body;
    if (!admin)
        res.status(400).json({ error: 'You are not admin' });
    let monster : MonsterCard | null = await MonsterCard.findOne({where: {name}})
    let spell : SpellCard | null = await SpellCard.findOne({where: {name}})
    if (monster || spell)
        res.status(400).json({ error: 'This card already exist and it is a' + (monster ? ' monster' : ' spell') + ' card' })
    TrapCard.create({
        name,
        archetypes,
        description,
        image_url,
        type,
        effect
    })
        .then(trap => {
            res.status(200).json({ trap });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
})

export default router;