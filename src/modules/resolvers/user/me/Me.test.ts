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
const meQuery = `

{
 me {
    username
    id
    email     
    firstName
    lastName
  }
}`;

describe('Me', () => {
  it('get user', async () => {
    const user = await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save();

    const response = await gqlCall({
      source: meQuery,
      userId: user.id
    });

    console.log('Response, ' + JSON.stringify(response));

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          email: user.email,
          username: user.username,
          firstName: null,
          lastName: null
        }
      }
    });
  });

  it('return null', async () => {
    const response = await gqlCall({ source: meQuery });
    expect(response).toMatchObject({
      data: {
        me: null
      }
    });

    console.log('Response, ' + JSON.stringify(response));
  });
});
