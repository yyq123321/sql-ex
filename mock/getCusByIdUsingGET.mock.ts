// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/customer/get': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
