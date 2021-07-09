import { IUser } from "../entities/IUser";
import IRepository from "../interfaces/IRepository";
import {
  comparePasswords,
  createJwtToken,
  generateSaltAndHash,
} from "../util/authentication";
import { makeRejectedPromise } from "../util/errors";
import {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from "../util/user_auth_requests";
import { signInValidators, signUpValidators } from "../util/validators";

export default class AuthenticationService {
  constructor(private userRepository: IRepository<IUser>) {}

  public async signIn(userSignInObject: UserSignInRequestDto) {
    try {
      // pre-auth validation
      for (let validator of signInValidators) {
        if (!validator.validate(userSignInObject)) {
          return makeRejectedPromise(validator.message, validator.statusCode);
        }
      }

      const targetUser = await this.userRepository.findOne(
        userSignInObject.username
      );
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
      return makeRejectedPromise("Invalid request.", 400);
    }
  }

  public async signUp(userSignupObject: UserSignUpRequestDto) {
    try {
      const targetUser = await this.userRepository.findOne(
        userSignupObject.username
      );
      if (targetUser) {
        return makeRejectedPromise(
          "User with credentials already exists.",
          409
        );
      }

      // pre-auth validation
      for (let validator of signUpValidators) {
        if (!validator.validate(userSignupObject)) {
          return makeRejectedPromise(validator.message, validator.statusCode);
        }
      }

      // assert server secret is defined
      const jwt_secret: string = process.env.JWT_SECRET || "";
      if (!jwt_secret) {
        return makeRejectedPromise("Internal server error.", 500);
      }

      const { salt, hash } = await generateSaltAndHash(
        userSignupObject.password
      );
      await this.userRepository.create(userSignupObject.username, {
        ...userSignupObject,
        salt,
        hash,
      });

      return Promise.resolve({
        statusCode: 200,
        message: "User created successfully.",
      });
    } catch (err) {
      return makeRejectedPromise(err.message, 400);
    }
  }
}
