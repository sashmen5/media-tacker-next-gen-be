import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Strategy } from 'passport-local';
import { PassportLocalModel } from 'mongoose';

import { AuthService } from '../auth.service';
import { User } from '../../../interfaces/user.interface';
import { USER } from '../../../constants/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService,
              @InjectModel(USER) private readonly userModel: PassportLocalModel<User>) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    }, userModel.authenticate());
  }
}
