import { ProgrammingLanguage } from '../../../enum/programming.language.enum';
import { UserRole } from '../../../enum/user.role.enum';
import { User } from '../../schemas/user.schema';

export const userStub = (): User => {
  return {
    userId: '123',
    email: 'test@example.com',
    age: 23,
    username: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test',
    programmingLanguages: [ProgrammingLanguage.JAVASCRIPT],
    role: UserRole.STUDENT,
  };
};
