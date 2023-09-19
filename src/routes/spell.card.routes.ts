import express, { Request, Response, Router } from 'express';
import { SHA512 } from 'crypto-js';
import jwtFunctions from '../jwt/jwt.functions';
import { Document, ObjectId } from 'mongoose';
import e from 'express';

const MonsterCardSchema = require('../schema/MonsterCardSchema');
const TrapCardSchema = require('../schema/TrapCardSchema');
const SpellCardSchema = require('../schema/SpellCardSchema');
const ArchetypeSchema = require('../schema/ArchetypeSchema');

// router

const router: Router = Router();

router.post('/create', async (req: Request, res: Response) => {
    const { name, archetypes, card_type, description, effect, image_url } = req.body;
    console.log(req.body)
    let admin = true
    if (!admin)
        return res.status(403).send({ error: 'You are not allowed to do this' });
    if (!name || !archetypes || !card_type || !description || !effect)
        return res.status(400).send({ error: 'Missing parameters' })
    
    let trap = await TrapCardSchema.find({ name: name });
    let spell = await SpellCardSchema.find({ name: name });
    let monster = await MonsterCardSchema.find({ name: name });

    if (trap.length > 0 || spell.length > 0 || monster.length > 0)
        return res.status(400).send({ error: 'Card already exists' });
    SpellCardSchema.create({
        name: name,
        archetypes: archetypes,
        card_type: card_type,
        description: description,
        effect: effect,
        created_at: Date.now(),
        updated_at: Date.now(),
        image_url: image_url
    }).then((newCard: any, err: Error) => {
        if (err)
        console.log(err)
    archetypes.forEach((str_archetype: string, index: number) => {
        try {
            ArchetypeSchema.find({ name: str_archetype.toLowerCase() }).then(async (archetype: any) => {
                if (archetype.length == 0)
                    await ArchetypeSchema.create({
                        name: str_archetype.toLowerCase(),
                        spells: [newCard.name],
                        monsters: [],
                        traps: []
                    })
                else {
                    await ArchetypeSchema.findOneAndUpdate({ name: str_archetype.toLowerCase() }, { $push: { spells: newCard.name }})
                }
            })  
        } catch (error) {
            console.log(error)
        }
    })
    res.status(201).send({ message: 'Card created', card: newCard });
    }).catch((err: Error) => {
        console.log(err)
        res.status(500).send({ error: err.message });
    })
});
        
export default router;