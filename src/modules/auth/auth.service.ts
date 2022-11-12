import * as jwt from 'jsonwebtoken';
import { PassportLocalModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


import { UserService } from '../user/user.service';
import { User } from '../../interfaces/user.interface';
import { RegistrationStatus } from '../../interfaces/registrationStatus.interface';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { USER } from '../../constants/constants';
import { Token } from '../../interfaces/token.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
              @InjectModel(USER) private readonly userModel: PassportLocalModel<User>) { }

  async register(user: RegisterUserDto): Promise<RegistrationStatus> {
    return await this.userService.register(user);
  }

  createToken(user: any): Token {
    const expiresIn = 864000;
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.username,
        firstname: user.firstName,
        lastname: user.lastName
      },
      'ILovePokemon',
       { expiresIn }
     );
    return {
      expiresIn: expiresIn * 1000,
      creationDate: Date.now(),
      accessToken
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.getUser(payload.id);
  }
}
