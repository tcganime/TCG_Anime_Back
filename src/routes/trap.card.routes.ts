import express, { Request, Response } from 'express';
import jwtFunctions from '../jwt/jwt.functions';
import Archetypes from '../models/archetypes.models';
import ArchetypeCatalog from '../models/catalog/archetype.catalog.table';
import MonsterCard from '../models/monster.card.model';
import TrapCard from '../models/trap.card.model';
import SpellCard from '../models/spell.card.model';

const router = express.Router();

function addTrapToArchetypeCatalog(archetype_id: number, trap_id: number) {
    ArchetypeCatalog.findOne({
        where: {
            archetype_id
        }
    }).then((catalog: any) => {
        if (catalog === null) {
            ArchetypeCatalog.create({
                archetype_id,
                monsters: [],
                spells: [],
                traps: [trap_id]
            }).then((catalog: any) => {
            }).catch((err: any) => {
                console.log('Error in ArchetypeCatalog.create')
            })
        } else {
            ArchetypeCatalog.update({
                traps: [...catalog.traps, trap_id]
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

router.post('/create/trap', async (req: Request, res: Response) => {
    try {
        let { admin, name, archetypes, card_type, effect, description, image_url } = req.body;
        admin = true;
        if (!admin)
            res.status(401).json({ message: 'Only admins can create cards.' });
        if (!name || !archetypes || !card_type || !effect || !description || !image_url)
            res.status(400).json({ message: 'Missing required fields.' });
        MonsterCard.findOne({where: {name}}).then((card: any) => {
            if (card) {
                res.send(400).json({ message: 'A monster with that name already exists.' });
                return;
            }
        })
        SpellCard.findOne({where: {name}}).then((card: any) => {
            if (card) {
                res.send(400).json({ message: 'A spell with that name already exists.' });
                return;
            }
        })
        TrapCard.create({
                name,
                archetypes,
                card_type,
                effect,
                description,
                image_url
        }).then(trap => {
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
                            addTrapToArchetypeCatalog(_archetype.id, trap.id)
                            res.status(201).json({ message : 'Trap card created.', trap: trap });
                        }).catch((err: any) => {
                            console.log('Error in Archetypes.create')
                        })
                    } else {
                        addTrapToArchetypeCatalog(archetype_obj.id, trap.id)
                        res.status(201).json({ message : 'Trap card created.', trap: trap });
                    }
                }).catch((err: any) => {
                    console.log('Error in Archetypes.findOne')
                })
            })
        }).catch((err: any) => {
            console.log(err)
            res.status(500).json({ message: err.message });
        })
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;