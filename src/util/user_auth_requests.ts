export type UserSignInRequestDto = {
  username: string;
  password: string;
};

export type UserSignUpRequestDto = {
  username: string;
  password: string;
  userInformation: {
    email: string;
    first_name: string;
    last_name: string;
  };
};
