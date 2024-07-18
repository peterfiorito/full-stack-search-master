import { Request, Response } from 'express';
import { searchController } from '../controllers/searchController';

export const searchHandler = async (req: Request, res: Response) => {
  const { query } = req.query;
  if (!query) {
    res.status(400).send("Query parameter is required");
    return;
  }

  try {
    const results = await searchController(req.db, query as string);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
