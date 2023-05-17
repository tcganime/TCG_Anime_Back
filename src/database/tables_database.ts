import { Pool } from 'pg';

class DB {
    pool = new Pool({
        user: 'anime_magic',
        host: 'localhost',
        database: 'postgres',
        password: 'anime_magic',
        port: 5432,
    })

    constructor() {
        console.log('DB instance created')
    }

    createUserTable() {        
        this.pool.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                admin BOOLEAN NOT NULL DEFAULT FALSE,
                victories INTEGER NOT NULL DEFAULT 0,
                defeats INTEGER NOT NULL DEFAULT 0,
                UNIQUE (username, email)
            )`,
            (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Users table created');
            }
        );
    }

    createDeckTable() {
        this.pool.query(
            `CREATE TABLE IF NOT EXISTS decks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                composition JSONB NOT NULL,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                UNIQUE (user_id)
            );
            `,
            (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Decks table created');
            }
        );
    }

    createMonsterCardTable() {
        this.pool.query(
            `CREATE TABLE IF NOT EXISTS monster_cards (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                card_type VARCHAR(255) NOT NULL,
                monster_type TEXT[] NOT NULL,
                attribute VARCHAR(255) NOT NULL,
                level INTEGER NOT NULL,
                atk INTEGER NOT NULL,
                def INTEGER NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT NOT NULL,
                effect JSONB[] NOT NULL,
                archetypes TEXT[] NOT NULL,
                UNIQUE (name)
            )`,
            (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Monster cards table created');
            }
        );
    }

    createSpellCardTable() {
        this.pool.query(
            `CREATE TABLE IF NOT EXISTS spell_cards (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                card_type VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT NOT NULL,
                effect JSONB NOT NULL,
                archetypes TEXT[] NOT NULL,
                UNIQUE (name)
            )`,
            (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Spell cards table created');
            }
        );
    }

    createTrapCardTable() {
        this.pool.query(
            `CREATE TABLE IF NOT EXISTS trap_cards (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                card_type VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT NOT NULL,
                effect JSONB NOT NULL,
                archetypes TEXT[] NOT NULL,
                UNIQUE (name)
            )`,
            (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Trap cards table created');
            }
        );
    }

    createArchetypeCatalogTable() {
        this.pool.query(
            `CREATE TABLE IF NOT EXISTS archetype_catalog (
                id SERIAL PRIMARY KEY,
                archetype_id INTEGER NOT NULL REFERENCES archetypes(id) ON DELETE CASCADE ON UPDATE CASCADE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                monsters INTEGER[] NOT NULL,
                spells INTEGER[] NOT NULL,
                traps INTEGER[] NOT NULL,
                UNIQUE (archetype_id)
            )`,
            (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Archetype catalog table created');
            }
        );
    }



    createArchetypeTable() {
        this.pool.query(
            `CREATE TABLE IF NOT EXISTS archetypes (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL
            )`, (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Archetypes table created');
            }
        )
    }

    init() {
        this.createUserTable();
        this.createDeckTable();
        this.createMonsterCardTable();
        this.createSpellCardTable();
        this.createTrapCardTable();
        this.createArchetypeCatalogTable();
        this.createArchetypeTable();
    }
}

export default new DB();