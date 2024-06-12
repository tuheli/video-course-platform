import express from 'express';
import { connectToDatabase } from './database';
import cors from 'cors';

const port = 3000;

const app = express();

app.use(cors());

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
