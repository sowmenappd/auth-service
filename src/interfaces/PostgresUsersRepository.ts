import config from "../config";
import pg from "pg";
import IRepository from "./IRepository";

export default class PostgresUsersRepository implements IRepository {
  private client: pg.Client;

  constructor() {
    const host = config.POSTGRES_HOST;
    const port = Number.parseInt(config.POSTGRES_PORT || "");
    const user = config.POSTGRES_USERNAME;
    const password = config.POSTGRES_PASSWORD;
    console.log({ user, password, host, port });

    this.client = new pg.Client({ user, password, host, port });
    this.client
      .connect()
      .then(() => console.log("pg client connected"))
      .catch((err) => console.log(err.message));
  }

  async findOne(id: string) {
    // const user = this.database.find(
    //   (user: { username: string }) => user.username === id
    // );
    // return user;
  }

  async findMany(ids: string[]) {
    // return this.database.filter((user: { username: string }) => {
    //   return ids.findIndex((id) => id === user.username) !== -1;
    // });
  }

  async create(id: string, entry: any) {
    // this.database.push(entry);
  }

  async update(id: string, updatedValue: any) {
    throw new Error("Method not implemented.");
  }

  async delete(id: string) {
    // const oldLength = this.database.length;
    // this.database = this.database.filter(
    //   (user: { username: string }) => user.username !== id
    // );
    // return oldLength - 1 === this.database.length;
  }
}
