export default interface ICreateRecipientDTO {
  userId: string;
  followUpSequenceId: string;
  subject: string;
  msgId: string;
  fromEmail: string;
  toEmail: string;
  active: boolean;
  startDate: string;
  lastBumpDay: string;
  nextBumpDay: string;
}
