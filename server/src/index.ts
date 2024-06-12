import express from 'express';
import { connectToDatabase } from './database';
import cors from 'cors';
import signupRouter from './routers/signupRouter';

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/signup', signupRouter);
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const start = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
