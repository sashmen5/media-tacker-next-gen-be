import { PassportLocalDocument } from 'mongoose';

export interface User extends PassportLocalDocument {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}

// export interface UsersService {
//   findAll(): Promise<User[]>;
//   findById(ID: number): Promise<User | null>;
//   findOne(options: object): Promise<User | null>;
//   create(user: User): Promise<User>;
//   update(ID: number, newValue: User): Promise<User | null>;
//   delete(ID: number): Promise<string>;
// }
