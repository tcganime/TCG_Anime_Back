import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'postgres',
    username: 'anime_magic',
    password: 'anime_magic',
    host: 'localhost',
    dialect: 'postgres',
});

  export default sequelize;