interface IMailConfig {
  driver: 'ethereal' | 'google';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'litteraeprototype@gmail.com',
      name: 'Litterae Test',
    },
  },
} as IMailConfig;
