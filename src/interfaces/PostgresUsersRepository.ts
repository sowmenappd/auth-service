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

    this.client = new pg.Client({
      user,
      password,
      host,
      port,
      database: "auth_db",
    });
    this.client
      .connect()
      .then(() => console.log("PostgreSQL client connected"))
      .catch((err) => console.log(err.message));
  }

  async findOne(id: string) {
    const query = "SELECT * FROM users WHERE username = $1";
    const res = await this.client.query(query, [id]);
    if (res.rowCount > 0) {
      return res.rows[0];
    }
    return null;
  }

  async findMany(ids: string[]) {
    throw new Error("Method not implemented.");
  }

  async create(id: string, entry: any) {
    const query =
      "INSERT INTO users(username, salt, hash, email, first_name, last_name) values($1, $2, $3, $4, $5, $6)";
    const res = await this.client.query(query, [
      id,
      entry.salt,
      entry.hash,
      entry.userInformation.email,
      entry.userInformation.first_name,
      entry.userInformation.last_name,
    ]);

    if (res.rowCount > 0) {
      return res.rows[0];
    }
    return null;
  }

  async update(id: string, updatedValue: any) {
    throw new Error("Method not implemented.");
  }

  async delete(id: string) {
    throw new Error("Method not implemented.");
  }
}
