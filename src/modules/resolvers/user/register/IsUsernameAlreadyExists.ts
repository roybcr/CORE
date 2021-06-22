import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../../../../entity/User';

@ValidatorConstraint({ name: 'UsernameAlreadyExists', async: true })
export class IsUsernameAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(username: string): Promise<boolean> {
    return User.findOne({ where: { username } }).then((user) => {
      if (user) {
        return false;
      } else {
        return true;
      }
    });
  }
}
export function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyExistConstraint
    });
  };
}
