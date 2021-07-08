import {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from "./user_auth_requests";

export const signInValidators = [
  {
    message: "Username must be valid.",
    statusCode: 400,
    validate: (credentials: UserSignInRequestDto) =>
      credentials.username !== null,
  },
  {
    message: "Password must be valid.",
    statusCode: 400,
    validate: (credentials: UserSignInRequestDto) =>
      credentials.password !== null,
  },
  {
    message: "Password must be at least 6 characters in length.",
    statusCode: 400,
    validate: (credentials: UserSignInRequestDto) =>
      credentials.password.length >= 6,
  },
];

export const signUpValidators = [
  {
    message: "Username must be valid.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      credentials.username !== null,
  },
  {
    message: "Password must be valid.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      credentials.password !== null,
  },
  {
    message: "Password must be at least 6 characters in length.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      credentials.password.length >= 6,
  },
  {
    message: "User information not provided.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      !!credentials.userInformation,
  },
  {
    message:
      "Email must be provided and length must be of at least 3 characters.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      credentials.userInformation.email?.length > 2,
  },
  {
    message:
      "First name must be provided and length must be of at least 3 characters.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      credentials.userInformation.first_name?.length > 2,
  },
  {
    message:
      "Last name must be provided and length must be of at least 3 characters.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      credentials.userInformation?.last_name?.length > 2,
  },
];
