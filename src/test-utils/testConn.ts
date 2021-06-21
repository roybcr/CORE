import { createConnection } from "typeorm";
import path from "path";
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
    entities: [path.join(__dirname + "/entity/*.js")],
  });
};
