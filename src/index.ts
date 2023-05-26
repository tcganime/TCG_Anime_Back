import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routers
import userRouter from './routes/users.routes';
import monsterCardRouter from './routes/monster.card.routes';

import mongoose, { ConnectOptions } from 'mongoose';

const DB_NAME = 'your_database_name';

const app: Express = express();
const db = mongoose.connection;
var bodyParser = require('body-parser');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info('Connected to MongoDB');
});

mongoose.connect("mongodb+srv://photanime2023:anime_card@cluster0.t659vop.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions);

dotenv.config();

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
app.use('/monsters', monsterCardRouter);

app.listen(8000, () => {
    console.log(`Server is running at port http://localhost:${8000}`);
  }
);
