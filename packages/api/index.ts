import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient, Db } from 'mongodb';

import searchRoutes from './routes/searchRoutes';

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors())
app.use(express.json());

let db: Db;

const connectToDatabase = async () => {
  const mongoClient = new MongoClient(DATABASE_URL);
  await mongoClient.connect();

  db = mongoClient.db();
  console.log('Successfully connected to MongoDB!');
};

connectToDatabase().catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

app.use((req, res, next) => {
  if (!db) {
    return res.status(500).send('Database connection not available');
  }
  req.db = db;
  next();
});

app.use('/search', searchRoutes);

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
})
