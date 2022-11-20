import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProgrammingLanguage } from '../../enum/programming.language.enum';
import { Document } from 'mongoose';
import { UserRole } from '../../enum/user.role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: UserRole })
  role: UserRole;

  @Prop()
  age: number;

  @Prop({ type: [String], enum: ProgrammingLanguage })
  programmingLanguages: ProgrammingLanguage[];
}

export const UserSchema = SchemaFactory.createForClass(User);
