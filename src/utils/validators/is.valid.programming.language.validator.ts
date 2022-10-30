import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProgrammingLanguage } from '../../enum/programming.language.enum';

@ValidatorConstraint({ name: 'isValidProgrammingLanguage', async: true })
@Injectable()
class IsValidProgrammingLanguageConstraint
  implements ValidatorConstraintInterface
{
  async validate(
    programmingLanguages: [ProgrammingLanguage],
  ): Promise<boolean> {
    if (!programmingLanguages) return false;
    const languages = Object.values(ProgrammingLanguage);
    const invalidLanguages: ProgrammingLanguage[] = programmingLanguages.filter(
      (language) => !languages.includes(language),
    );
    return invalidLanguages.length > 0 ? false : true;
  }
}

export function IsValidProgrammingLanguage(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidProgrammingLanguageConstraint,
    });
  };
}
