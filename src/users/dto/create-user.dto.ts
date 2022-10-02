import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailUserAlreadyExist } from '../../utils/validators/is.email.exist.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty, please check documentation' })
  @IsEmail({
    message: 'Invalid Email. Please sure the correct format',
  })
  @IsEmailUserAlreadyExist({
    message: 'Email address already exists!',
  })
  email: string;
  @IsNotEmpty({ message: 'Age cannot be empty, please check documentation' })
  age: number;
  @IsNotEmpty({
    message:
      'Programming Languages cannot be empty, please check documentation',
  })
  programmingLanguages: string[];
}
