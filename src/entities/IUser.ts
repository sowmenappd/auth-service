export interface IUser {
  username: string;
  salt: string;
  hash: string;
  userInformation?: {
    email?: string;
    first_name?: string;
    last_name?: string;
  };
}
