import { Body, Controller, HttpStatus, Put, Res, UseGuards } from "@nestjs/common";

import { SEASON_CONTROLLER } from "../../constants/constants";
import { SeasonService } from './season.service';
import { User } from '../../interfaces/user.interface';
import { AuthGuard } from "@nestjs/passport";
import { WatchedEpisode } from "../../interfaces/season.interface";

export interface RequestWithUser extends Request {
  user: User;
}


@Controller(SEASON_CONTROLLER)
export class SeasonController {
  constructor(private seasonService: SeasonService) { }

  // @Get('all')
  // // @UseGuards(AuthGuard('jwt'))
  // async getMovies(@Res() res:any, @Req() request: RequestWithUser) {
  //   const posts = await this.seasonService.getMovies();
  //   return res.status(HttpStatus.OK).json(posts);
  // }

  // @Get(':movieID')
  // async getMovie(@Res() res:any, @Param('movieID' /*new ValidateObjectId()*/) movieID: string) {
  //   const movie = await this.seasonService.getMovie(parseInt(movieID));
  //   if (!movie) {
  //     throw new NotFoundException('Movie does not exist!');
  //   }
  //   return res.status(HttpStatus.OK).json(movie);
  // }

  // @Get('/saveFromApi/:movieId')
  // async saveFromApi(@Res() res, @Param('movieId') movieId) {
  //   const movie: Movie = await this.seasonService.getMovieFromApi(movieId);
  //   const newMovie = await this.seasonService.addMovie(movie);
  //
  //   if (!newMovie) {
  //     throw new NotFoundException('Movie already exists!');
  //   }
  //   return res.status(HttpStatus.OK).json(newMovie);
  // }

  @Put('watchEpisode')
  @UseGuards(AuthGuard('jwt'))
  async watchEpisode(@Res() res: any, @Body() body: WatchedEpisode) {
    const season = this.seasonService.setWatchSerie(body);
    console.log('updated season', season);
    return res.status(HttpStatus.OK).json({season: season});
  }

  @Put('deWatchEpisode')
  @UseGuards(AuthGuard('jwt'))
  async deWatchEpisode(@Res() res: any, @Body() body: WatchedEpisode) {
    const season = this.seasonService.deWatchSerie(body);
    console.log('updated season', season);
    return res.status(HttpStatus.OK).json({season: season});
  }

  // @Delete(':movieID')
  // @UseGuards(AuthGuard('jwt'))
  // async deletePost(@Res() res: any, @Param('movieID' /*new ValidateObjectId()*/) movieID: string) {
  //   const id = await this.seasonService.deleteMovie(parseInt(movieID));
  //   if (!id) {
  //     throw new NotFoundException('Post does not exist!');
  //   }
  //   return res.status(HttpStatus.OK).json({id});
  // }
}
