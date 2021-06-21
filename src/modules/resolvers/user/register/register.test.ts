import { Connection } from "typeorm";
import { testConn } from "../../../../test-utils/testConn";
import { gqlCall } from "../../../../test-utils/gqlCall";
let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  conn.close();
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
  it("create user", async () => {
    console.log(
      await gqlCall({
        source: registerMutatuion,
        variableValues: {
          registerInput: {
            email: "roy@roy.com",
            username: "roy",
            password: "1",
          },
        },
      })
    );
  });
});
