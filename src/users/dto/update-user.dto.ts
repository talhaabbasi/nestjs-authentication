import { IsNumber } from 'class-validator';
import { IsValidProgrammingLanguage } from '../../utils/validators/is.valid.programming.language.validator';

export class UpdateUserDto {
  @IsValidProgrammingLanguage({
    message:
      'Programming languages are not correct. Please check documentation',
  })
  programmingLanguages?: string[];

  @IsNumber()
  age?: number;
}
