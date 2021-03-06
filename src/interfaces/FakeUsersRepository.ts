import { IUser } from "../entities/IUser";
import IRepository from "./IRepository";

export default class FakeUsersRepository implements IRepository<IUser> {
  private database: IUser[];

  constructor() {
    this.database = [
      {
        username: "abcdef",
        // password: "test123",
        salt: "$2b$14$SiMvz5CxSmK.JRSHbsCdZe",
        hash: "$2b$14$SiMvz5CxSmK.JRSHbsCdZems3ET9apBH9OXmcx38Ky0Nl/WsMl88a",
      },
      {
        username: "xyzabc",
        // password: "test234",
        salt: "$2b$14$5VbVka1YgWciB87HSlmNp.",
        hash: "$2b$14$5VbVka1YgWciB87HSlmNp.JjkerPge.RBJly9.FqANUCUsjzCxzEK",
      },
    ];
  }

  async findOne(id: string): Promise<IUser | undefined> {
    const user = this.database.find((user: IUser) => user.username === id);
    return user;
  }

  async findMany(ids: string[]): Promise<IUser[] | undefined> {
    return this.database.filter((user: IUser) => {
      return ids.findIndex((id) => id === user.username) !== -1;
    });
  }

  async create(id: string, entry: IUser) {
    this.database.push(entry);
  }

  async update(id: string, updatedValue: any) {
    throw new Error("Method not implemented.");
  }

  async delete(id: string) {
    const oldLength = this.database.length;

    this.database = this.database.filter(
      (user: { username: string }) => user.username !== id
    );

    return oldLength - 1 === this.database.length;
  }
}
