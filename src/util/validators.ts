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
    message: "Email cannot be empty.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      !!credentials.userInformation?.email,
  },
  {
    message: "First name cannot be empty.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      !!credentials.userInformation?.first_name &&
      credentials.userInformation.first_name.length > 2,
  },
  {
    message: "Last name cannot be empty.",
    statusCode: 400,
    validate: (credentials: UserSignUpRequestDto) =>
      !!credentials.userInformation?.last_name &&
      credentials.userInformation.last_name.length > 2,
  },
];
