export type UserSignInRequestDto = {
  username: string;
  password: string;
};

export type UserSignUpRequestDto = {
  username: string;
  password: string;
  userInformation: any;
};
