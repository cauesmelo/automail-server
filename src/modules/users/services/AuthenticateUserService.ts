import { injectable, inject, container } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { OAuth2Client } from 'google-auth-library';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import User from '../infra/typeorm/entities/User';

interface VerifyIdTokenOptions {
  idToken: string;
  audience?: string | string[];
  maxExpiry?: number;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(idToken: string): Promise<User> {
    const { GOOGLE_MAILING_CLIENT_ID } = process.env;

    const client = new OAuth2Client(GOOGLE_MAILING_CLIENT_ID);

    async function verifyToken() {
      try {
        const tokenData: VerifyIdTokenOptions = {
          idToken,
          audience: GOOGLE_MAILING_CLIENT_ID,
        };
        const ticket = await client.verifyIdToken(tokenData);
        const payload = ticket.getPayload();
        return payload;
      } catch (err) {
        throw new AppError('Invalid token.');
      }
      return null;
    }

    const payloadUser = await verifyToken();

    if (!payloadUser?.email) {
      throw new AppError('Auth error.');
    }

    const findUser = await this.usersRepository.findByEmail(payloadUser?.email);

    if (!findUser) {
      const createUser = container.resolve(CreateUserService);

      const createdUser = await createUser.execute({
        email: payloadUser.email,
        companyName: '',
        deleted: false,
        name: payloadUser.name ? payloadUser.name : 'Usuário sem nome',
        premium: false,
        userType: 'free',
      });

      return createdUser;
    }

    return findUser;
  }
}
