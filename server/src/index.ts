import express from 'express';
import { connectToDatabase } from './database';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const start = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
