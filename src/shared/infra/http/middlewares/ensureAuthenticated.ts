import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import { OAuth2Client } from 'google-auth-library';

interface VerifyIdTokenOptions {
  idToken: string;
  audience?: string | string[];
  maxExpiry?: number;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const { GOOGLE_MAILING_CLIENT_ID } = process.env;

  const client = new OAuth2Client(GOOGLE_MAILING_CLIENT_ID);

  const [, idToken] = authHeader.split(' ');

  async function verifyToken() {
    try {
      const tokenData: VerifyIdTokenOptions = {
        idToken,
        audience: GOOGLE_MAILING_CLIENT_ID,
      };
      const ticket = await client.verifyIdToken(tokenData);
      ticket.getPayload();
      return next();
    } catch (error) {
      return response.status(401).json('Invalid token.');
    }
  }

  verifyToken()
    .then()
    .catch(e => {
      console.log(e);
    });
}
