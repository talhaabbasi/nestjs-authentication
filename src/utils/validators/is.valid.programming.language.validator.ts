import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProgrammingLanguage } from '../../../enum/programming.language.enum';
let invalidLanguages: ProgrammingLanguage[];

@ValidatorConstraint({ name: 'isValidProgrammingLanguage', async: true })
@Injectable()
class IsValidProgrammingLanguageConstraint
  implements ValidatorConstraintInterface
{
  async validate(programmingLanguages: [ProgrammingLanguage]) {
    const languages = Object.values(ProgrammingLanguage);
    invalidLanguages = programmingLanguages.filter(
      (language) => !languages.includes(language),
    );
    return invalidLanguages.length > 0 ? false : true;
  }
}

export function IsValidProgrammingLanguage(
  validationOptions?: ValidationOptions,
) {
  validationOptions.message = `${invalidLanguages} programming languages do not exist!`;
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
