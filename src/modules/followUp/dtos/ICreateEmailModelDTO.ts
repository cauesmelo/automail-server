export default interface ICreateEmailModelDTO {
  userId: string;
  followUpSequenceId: string;
  content: string;
  daysAfter: number;
}
