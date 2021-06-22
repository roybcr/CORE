import { Connection } from "typeorm";
import { testConn } from "../../../../test-utils/testConn";
import { gqlCall } from "../../../../test-utils/gqlCall";
import { closeInstance } from "../../../../lib/redis";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  closeInstance(async () => {
    await conn.close();
  });
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
            username: "sasa",
            email: "sa@aaa.com",
            password: "12345",
          },
        },
      })
    );
  });
});
