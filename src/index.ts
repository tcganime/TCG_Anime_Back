import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db_sequelize';
import DATABASE from './tables_database';
import secret_key from './jwt/secret_key';

// Routers
import userRouter from './routes/users.routes';
import deckRouter from './routes/deck.routes';
import cardRouter from './routes/monster.card.route.';

DATABASE.init();

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error: Error) => {
  console.error('Unable to connect to the database:', error);
})


console.log('Secret key is initialised')

var bodyParser = require('body-parser');
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({origin: true, credentials: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
    }
);

app.use('/users', userRouter);
app.use('/decks', deckRouter);
app.use('/cards', cardRouter);

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
  }
);
