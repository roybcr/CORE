import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { User } from "../../../entity/User";

@ValidatorConstraint({ async: true })
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
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyExistConstraint,
    });
  };
}
