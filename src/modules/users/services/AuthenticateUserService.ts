import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { OAuth2Client } from 'google-auth-library';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IResponse {
  name: string;
  picture: string;
  givenName: string;
  familyName: string;
  locale: string;
  email: string;
}

interface IPayload {
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  email: string;
}

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(idToken: string): Promise<IResponse> {
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
      } catch (error) {
        console.log(error);
      }
      return null;
    }

    // Verificar como anular este erro

    const {
      name,
      picture,
      given_name,
      family_name,
      locale,
      email,
    } = await verifyToken();

    const user = {
      name,
      picture,
      givenName: given_name,
      familyName: family_name,
      locale,
      email,
    };

    // const user = await this.usersRepository.findByEmail(email);

    // if (!user) {
    //   throw new AppError('Incorrect email/password combination.');
    // }

    return user;
  }
}
