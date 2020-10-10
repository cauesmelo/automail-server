import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailtTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
