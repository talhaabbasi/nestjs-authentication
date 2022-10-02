import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProgrammingLanguage } from '../../../enum/programming.language.enum';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop({ type: [String], enum: ProgrammingLanguage })
  programmingLanguages: ProgrammingLanguage[];
}

export const UserSchema = SchemaFactory.createForClass(User);
