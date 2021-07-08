import IRepository from "../interfaces/IRepository";
import {
  comparePasswords,
  createJwtToken,
  generateHash,
  generateSaltAndHash,
} from "../util/authentication";
import { makeRejectedPromise } from "../util/errors";
import { UserSignInRequestDto } from "../util/user_auth_requests";

const validators = [
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

export default class AuthenticationService {
  constructor(private userRepository: IRepository) {}

  public async signIn(userSignInObject: UserSignInRequestDto) {
    try {
      // pre-auth validation
      for (let validator of validators) {
        if (!validator.validate(userSignInObject)) {
          return Promise.reject({
            message: validator.message,
            statusCode: validator.statusCode,
          });
        }
      }

      const targetUser = this.userRepository.findOne(userSignInObject.username);
      if (!targetUser) {
        return makeRejectedPromise(
          "User with credentials doesn't not exist.",
          404
        );
      }

      // assert server secret is defined
      const jwt_secret: string = process.env.JWT_SECRET || "";
      if (!jwt_secret) {
        return makeRejectedPromise("Internal server error.", 500);
      }

      // authenticate
      const authenticated = await comparePasswords(
        userSignInObject.password,
        targetUser.hash
      );
      if (authenticated) {
        const userObjToSign = {
          username: targetUser.username,
        };
        const token = createJwtToken(userObjToSign, jwt_secret, Date.now());

        return Promise.resolve({
          statusCode: 200,
          token,
        });
      }
      return makeRejectedPromise("Invalid user credentials.", 401);
    } catch (err) {
      return makeRejectedPromise("Invalid user credentials.", 401);
    }
  }
}
