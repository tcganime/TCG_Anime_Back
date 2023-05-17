import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import jwtFunctions from '../jwt/jwt.functions';
import MonsterCard from '../models/monster.card.model';
import Archetypes from '../models/archetypes.models';
import ArchetypeCatalog from '../models/catalog/archetype.catalog.table';

const router = express.Router();

function addArchetypeCatalog(archetype_id: number, monster_id: number) {
    ArchetypeCatalog.findOne({
        where: {
            archetype_id
        }
    }).then((catalog: any) => {
        catalog.monsters.push(monster_id)
        catalog.save()
    }).catch((err: any) => {
        ArchetypeCatalog.create({
            archetype_id,
            monsters: [monster_id],
            spells: [],
            traps: []
        }).then((catalog: any) => {
            console.log(catalog)
        }).catch((err: any) => {
            console.log('Error in ArchetypeCatalog.create')
            console.log(err)
        })
    })

}

router.post('/create/monster', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    let { admin, name, archetypes, level, atk, def, attribute, card_type, monster_type, description, image_url, effect } = req.body;
    if (!admin)
        res.status(400).json({ error: 'You are not admin' });
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
    }).then(monster => {
        archetypes.forEach((archetype: string) => {
            Archetypes.create({
                name: archetype
            }).then((archetype: any) => {
                addArchetypeCatalog(archetype.id, monster.id)
            }).catch((err: any) => {
                Archetypes.findOne({
                    where: {
                        name: archetype
                    }
                }).then((archetype: any) => {
                    addArchetypeCatalog(archetype.id, monster.id)
                }).catch((err: any) => {
                    console.log('Error in Archetypes.findOne')
                    console.log(err)
                })
            })
        })
        res.status(201).json({ 'message': 'Monster card created !', 'monster': monster })
    }).catch((err: any) => {
        console.log(err)
        res.status(500).send({ 'message': err.message })
    })
});

export default router