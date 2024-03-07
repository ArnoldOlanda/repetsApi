import { Router } from 'express';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

const router = Router();
const seedController = new SeedController(new SeedService());

router.get('/', seedController.seed);

export default router;
