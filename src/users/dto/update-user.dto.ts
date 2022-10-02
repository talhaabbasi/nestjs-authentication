import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  programmingLanguages: string[];
  @IsNotEmpty()
  age: number;
}
