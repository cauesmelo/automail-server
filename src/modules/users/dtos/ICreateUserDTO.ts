export default interface ICreateUserDTO {
  name: string;
  email: string;
  premium: boolean;
  deleted: boolean;
  companyName: string;
  userType: 'free' | 'premium';
}
