import express, { Request, Response } from 'express';
import jwtFunctions from '../jwt/jwt.functions';
import SpellCard from '../models/spell.card.model';
import Archetypes from '../models/archetypes.models';
import ArchetypeCatalog from '../models/catalog/archetype.catalog.table';
import MonsterCard from '../models/monster.card.model';
import { exit } from 'process';

const router = express.Router();

function addSpellToArchetypeCatalog(archetype_id: number, spell_id: number) {
    ArchetypeCatalog.findOne({
        where: {
            archetype_id
        }
    }).then((catalog: any) => {
        if (catalog === null) {
            ArchetypeCatalog.create({
                archetype_id,
                monsters: [],
                spells: [spell_id],
                traps: []
            }).then((catalog: any) => {
                console.log(catalog)
            }).catch((err: any) => {
                console.log('Error in ArchetypeCatalog.create')
            })
        } else {
            ArchetypeCatalog.update({
                spells: [...catalog.spells, spell_id]
            }, {
                where: {
                    archetype_id
                }
            }).then((catalog: any) => {
                console.log(catalog)
            }).catch((err: any) => {
                console.log('Error in ArchetypeCatalog.update')
            })
        }
    }).catch((err: any) => {
        console.log('Error in ArchetypeCatalog.findOne')
    })
}

type Effect = {
    type: string;
    description: string;
}

router.post('/create/spell', async (req: Request, res: Response) => {
    let { admin, name, archetypes, card_type, effect, description, image_url } = req.body;
    admin = true;
    if (!admin)
        res.status(401).json({ message: 'Only admins can create cards.' });
    if (!name || !archetypes || !card_type || !effect || !description || !image_url)
        res.status(400).json({ message: 'Missing required fields.' });
    MonsterCard.findOne({where: {name}}).then((card: any) => {
        if (card)
            res.send(400).json({ message: 'A monster with that name already exists.' });
    })
    SpellCard.create({
            name,
            archetypes,
            card_type,
            effect,
            description,
            image_url
    }).then(spell => {
        archetypes.forEach((archetype: string) => {
            Archetypes.findOne({
                where: {
                    name: archetype
                }
            }).then((archetype_obj: any) => {
                if (archetype_obj === null) {
                    Archetypes.create({
                        name: archetype
                    }).then((_archetype: any) => {
                        addSpellToArchetypeCatalog(_archetype.id, spell.id)
                    }).catch((err: any) => {
                        console.log('Error in Archetypes.create')
                    })
                } else {
                    addSpellToArchetypeCatalog(archetype_obj.id, spell.id)
                }
            }).catch((err: any) => {
                console.log('Error in Archetypes.findOne')
            })
        })
        res.status(201).json({ message : 'Spell card created.', spell: spell });
    }).catch((err: any) => {
        console.log(err)
        res.status(500).json({ message: err.message });
    })
});

export default router;