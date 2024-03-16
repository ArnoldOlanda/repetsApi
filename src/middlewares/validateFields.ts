import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const validateFields = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedDto = plainToInstance(dto, req.body);
      const errors = await validate(validatedDto, { whitelist: true });

      const mapedErrors = errors.map((error) => {
        return {
          field: error.property,
          messages: Object.values(error.constraints || {}),
        };
      });

      if (errors.length > 0) {
        return res.status(400).json({ errors: mapedErrors });
      }

      next();
      return;
    } catch (error) {
      console.error('Error de validación:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};
