import { ObjectId } from "mongoose"

interface Archetype extends Document {
    name: string,
    _id: ObjectId
}

interface MonsterCard extends Document {
    name: string,
    _id: ObjectId,
    archetypes: string[],
    card_type: string,
    attribute: string,
    level: number,
    atk: number,
    def: number,
    description: string,
    effect: [Object],
    created_at: Date,
    updated_at: Date
}

interface ArchetypeCatalog extends Document {
    _id: ObjectId,
    archetype_id: ObjectId,
    traps: ObjectId[],
    spells: ObjectId[],
    monsters: ObjectId[]
}

export { Archetype, ArchetypeCatalog, MonsterCard }