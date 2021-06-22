import { Connection } from "typeorm";
import { testConn } from "../../../../test-utils/testConn";
import { gqlCall } from "../../../../test-utils/gqlCall";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});
const registerMutatuion = `

mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    username
    id
    email     
  }
}`;

describe("Register", () => {
  it.only("create user", async () => {
    console.log(
      await gqlCall({
        source: registerMutatuion,
        variableValues: {
          registerInput: {
            username: "aaaf",
            email: "aaka@aaa.com",
            password: "12345",
          },
        },
      })
    );
  });
});
