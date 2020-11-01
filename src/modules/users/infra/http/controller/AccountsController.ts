import { Request, Response } from 'express';

export default class SessionsControler {
  public async index(request: Request, response: Response): Promise<Response> {
    console.log('chegou ao controller');
    return response.json('Chegou ao controller');
  }
}
