import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRole } from '../../enum/user.role.enum';

@ValidatorConstraint({ name: 'isValidUserRole', async: true })
@Injectable()
class IsValidUserRoleConstraint implements ValidatorConstraintInterface {
  async validate(userRole: UserRole): Promise<boolean> {
    if (!userRole) return false;
    const userRoles = Object.values(UserRole);
    return userRoles.includes(userRole) ? true : false;
  }
}

export function IsValidUserRole(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidUserRoleConstraint,
    });
  };
}
