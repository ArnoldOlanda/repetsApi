import { Router } from 'express';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import passport from 'passport';

const router = Router();
const seedController = new SeedController(new SeedService());

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', seedController.seed);

export default router;
