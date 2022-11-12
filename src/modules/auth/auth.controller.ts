import { Controller, UseGuards, HttpStatus, Response, Request, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';
import { CollectionService } from '../collection/collection.service';
import { RegistrationStatus } from '../../interfaces/registrationStatus.interface';
import { User } from '../../interfaces/user.interface';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { Token } from '../../interfaces/token.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userService: UserService,
              private readonly collectionService: CollectionService,
              ) {}

  @Post('register')
  public async register(@Response() res: any, @Body() registerUserDto: RegisterUserDto) {
    console.log('[register]', registerUserDto)
    const result: RegistrationStatus = await this.authService.register(registerUserDto);
    if (!result.success || !result.userId) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    await this.collectionService.createCollection(result.userId);
    return res.status(HttpStatus.OK).json({...result});
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  public async login(@Response() res: any, @Body() login: LoginUserDto): Promise<Token> {
    return await this.userService.getUser(login.email).then((user: User) => {
      if (!user) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'User Not Found',
        });
      } else {
        const token: Token = this.authService.createToken(user);
        return res.status(HttpStatus.OK).json({token});
      }
    });
  }
}
