import { Sequelize } from 'sequelize';

// sqlite database : ./anime.sqlite

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'postgres',
    username: 'anime_magic',
    password: 'anime_magic'
});

  export default sequelize;