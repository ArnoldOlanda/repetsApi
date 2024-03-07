import { Request, Response } from 'express';
import { SeedService } from './seed.service';

export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  public seed = async (_req: Request, res: Response) => {
    const message = await this.seedService.seed();
    res.json(message);
  };
}
