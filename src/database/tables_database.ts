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

    createCardTable() {
        this.pool.query(
            `CREATE TABLE IF NOT EXISTS cards (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                card_type TEXT NOT NULL,
                type TEXT[] NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                description TEXT NOT NULL,
                functionality JSONB NOT NULL
            )`, (err: Error) => {
                if (err)
                    console.log(err.stack);
                else
                    console.log('Cards table created');
            }
        )
    }

    init() {
        this.createUserTable();
        this.createDeckTable();
        this.createCardTable();
    }
}

export default new DB();