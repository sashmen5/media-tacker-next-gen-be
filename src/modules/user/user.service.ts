import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../../constants/constants';
import { PassportLocalModel } from 'mongoose';
import { User } from '../../interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { RegisterUserDto } from './dto/register-user.dto';
import { debug } from 'util';
import { RegistrationStatus } from '../../interfaces/registrationStatus.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER) private readonly userModel: PassportLocalModel<User>) {}

  async getUser(identifier: string): Promise<User | null> {
    const user: User | null = await this.userModel
      .findOne({
        $or: [
          { id : identifier },
          { username: identifier }
        ]
      })
      .exec();
    return user;
  }

  async register(registerUserDto: RegisterUserDto): Promise<RegistrationStatus> {
    const newUser = {
      id: randomStringGenerator(),
      username: registerUserDto.email,
      firstName: registerUserDto.firstName,
      lastName: registerUserDto.lastName
    };

    let error = null;
    await this.userModel.register(new this.userModel(newUser), registerUserDto.password,
      (err) => {
        error = err;
        if (err) {
          debug(err);
          return { success: false, message: err};
        }
      });

    if (!error) {
      return { success: true, message: 'User registered', userId: newUser.id };
    }

    return { success: false, message: 'User not registered', userId: '' };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userDto: CreateUserDto = {
      ...createUserDto,
      id: randomStringGenerator()
    };
    const createdUser = new this.userModel(userDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
