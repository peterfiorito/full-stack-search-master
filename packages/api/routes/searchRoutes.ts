import { Router } from 'express';
import { searchHandler } from '../handlers/searchHandler';

const router = Router();

router.get('/', searchHandler);

export default router;
