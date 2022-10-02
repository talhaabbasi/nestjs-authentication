import { IsNotEmpty } from 'class-validator';
import { IsValidProgrammingLanguage } from '../../utils/validators/is.valid.programming.language.validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsValidProgrammingLanguage({
    message:
      'Programming languages are not correct. Please check documentation',
  })
  programmingLanguages: string[];

  @IsNotEmpty()
  age: number;
}
