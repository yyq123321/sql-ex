// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/food/add': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
