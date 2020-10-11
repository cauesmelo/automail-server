import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

// interface IMailtContact {
//   name: string;
//   email: string;
// }

export default interface ISendMailDTO {
  to: string;
  from?: string;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
