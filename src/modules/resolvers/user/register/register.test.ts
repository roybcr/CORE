/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Connection } from 'typeorm';
import { testConn } from '../../../../test-utils/testConn';
import { gqlCall } from '../../../../test-utils/gqlCall';
import { redis } from '../../../../lib/redis';
import faker from 'faker';
import { User } from '../../../../entity/User';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  redis.disconnect();
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

describe('Register', () => {
  it('create user', async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await gqlCall({
      source: registerMutatuion,
      variableValues: {
        registerInput: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          username: user.username,
          email: user.email
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.username).toBe(user.username);
    expect(dbUser!.firstName).toBeNull();
    expect(dbUser!.lastName).toBeNull();
  });
});
