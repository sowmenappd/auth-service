import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { addDaysToDate } from "./misc";

export const comparePasswords = async (password: string, hashed: string) => {
  const equal = await bcrypt.compare(password, hashed);
  return equal;
};

export const generateHash = async (password: string, salt: string) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateSaltAndHash = async (password: string) => {
  const salt = await bcrypt.genSalt(14);
  const hash = await bcrypt.hash(password, salt);

  return { salt, hash };
};

export const createJwtToken = (
  injectedObjectToSign: any,
  secret: string,
  date: number
) => {
  const iat = date;
  const exp = addDaysToDate(date, 3); // the token sets 3 days from creation as it's expiry

  const objectToSign = { ...injectedObjectToSign, iat, exp };
  return jwt.sign(objectToSign, secret);
};
