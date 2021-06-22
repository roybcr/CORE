import { createConnection } from "typeorm";
import { User } from "../entity/User";
export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "roy",
    password: "§§§§",
    database: "coredb-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [User],
  });
};
