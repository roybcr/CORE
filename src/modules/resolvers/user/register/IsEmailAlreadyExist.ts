import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { User } from "../../../../entity/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    return User.findOne({ where: { email } }).then((user) => {
      if (user) {
        return false;
      } else {
        return true;
      }
    });
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
