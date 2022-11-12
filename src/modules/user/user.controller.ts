import { Controller, Get, HttpStatus, NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { User } from '../../interfaces/user.interface';
import { USER_CONTROLLER } from '../../constants/constants';
// import { RequestWithUser } from '../movie/movie.controller';

@Controller(USER_CONTROLLER)
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Res() res: any,  @Req() request: any) {
    const { id }: User = request.user;
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({user});
  }
}
