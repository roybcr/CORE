export enum Roles {
  ADMIN,
  // Linity's dedicated team members, assigned to this role for a specific goal.
  // Should be temporary.

  MOD,
  // Currently not used.
  // Loyal users that are intended to actively prevent other users from violating the community rules.

  AUTH_USER,
  // Any user that is currently logged in, and is authenticated.

  UNAUTH_USER,
  // Any user that have registered but didn't confirm the confirmation email.

  CREATOR,
  // An authenticated user to an entity he created.

  LEARNER,
  // An Authenticated User to Public path he's learning.

  WATCHER,
  // An Authenticated User to any Entity that is not owned / created by the user,
  //and he doesn't have any relation to this entity (e.g. a public learning path he isn't learning)

  GUEST,
  // Anyone who is not logged in.
}
