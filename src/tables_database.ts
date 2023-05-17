import sqlite3 from 'sqlite3';

class DB {
    db = new sqlite3.Database('./anime.sqlite')

    constructor() {
        console.log('DB instance created');
    }
    createUserTable() {        
        this.db.run(
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
        this.db.run(
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
        this.db.run(
            `CREATE TABLE IF NOT EXISTS monster_cards (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                archetypes NUMERIC[],
                level INTEGER NOT NULL,
                atk INTEGER NOT NULL,
                def INTEGER NOT NULL,
                attribute VARCHAR(255) NOT NULL,
                type STRING[] NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT NOT NULL,
                effect TEXT NOT NULL,
                UNIQUE (name)
            );
            `, (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Monster cards table created');
            }
        );
    }

    createSpellCardTable() {
        this.db.run(
            `CREATE TABLE IF NOT EXISTS spell_cards (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                archetypes NUMERIC[],
                type VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT NOT NULL,
                effect TEXT NOT NULL,
                UNIQUE (name)
            );
            `, (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Spell cards table created');
            }
        );
    }

    createTrapCardTable() {
        this.db.run(
            `CREATE TABLE IF NOT EXISTS trap_cards (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                archetypes NUMERIC[],
                type VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT NOT NULL,
                effect TEXT NOT NULL,
                UNIQUE (name)
            );
            `, (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Trap cards table created');
            }
        );
    }




    createArchetypeTable() {
        this.db.run(
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
        this.createArchetypeTable();
    }
}

export default new DB();