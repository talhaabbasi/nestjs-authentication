import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailUserAlreadyExist } from '../../utils/validators/is.email.exist.validator';
import { IsValidProgrammingLanguage } from '../../utils/validators/is.valid.programming.language.validator';
import { IsValidUserRole } from '../../utils/validators/is.valid.user.role.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty. Please check documentation' })
  @IsEmail({
    message: 'Invalid Email. Please use the correct format',
  })
  @IsEmailUserAlreadyExist({
    message: 'Email address already exists!',
  })
  email: string;

  @IsNotEmpty({ message: 'Age cannot be empty. Please check documentation' })
  age: number;

  @IsNotEmpty({
    message:
      'Programming Languages cannot be empty. Please check documentation',
  })
  @IsValidProgrammingLanguage({
    message:
      'Programming languages are not correct. Please check documentation',
  })
  programmingLanguages: string[];

  @IsNotEmpty({
    message: 'Role cannot be empty. Please check documentation',
  })
  @IsValidUserRole({
    message: 'Role is not correct. Please check documentation',
  })
  role: string;
}
