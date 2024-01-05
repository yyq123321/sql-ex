// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/customer/login': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
