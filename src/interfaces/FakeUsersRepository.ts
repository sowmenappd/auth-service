import IRepository from "./IRepository";

export default class FakeUsersRepository implements IRepository {
  private users = [
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

  constructor(private database?: any) {
    // this.database = this.users;
  }

  findOne(id: string) {
    const user = this.users.find(
      (user: { username: string }) => user.username === id
    );
    return user;
  }

  findMany(ids: string[]) {
    return this.users.find((user: { username: string }) => {
      return ids.findIndex((id) => id === user.username) !== -1;
    });
  }

  create(params: any) {
    throw new Error("Method not implemented.");
  }

  update(id: string, updatedValue: any) {
    throw new Error("Method not implemented.");
  }

  delete(id: string) {
    const oldLength = this.database.length;

    this.database = this.database.filter(
      (user: { username: string }) => user.username !== id
    );

    if (oldLength === this.users.length) return false;
    return true;
  }
}
