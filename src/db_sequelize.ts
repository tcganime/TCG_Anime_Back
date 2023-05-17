import { Sequelize } from 'sequelize';

// sqlite database : ./anime.sqlite

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './anime.sqlite',
    logging: true,
});

  export default sequelize;