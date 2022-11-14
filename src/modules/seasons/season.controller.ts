import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { SEASON_CONTROLLER } from "../../constants/constants";
import { SeasonService } from './season.service';
import { User } from '../../interfaces/user.interface';

export interface RequestWithUser extends Request {
  user: User;
}

@Controller(SEASON_CONTROLLER)
export class SeasonController {
  constructor(private movieService: SeasonService) { }

  // @Get('all')
  // // @UseGuards(AuthGuard('jwt'))
  // async getMovies(@Res() res:any, @Req() request: RequestWithUser) {
  //   const posts = await this.movieService.getMovies();
  //   return res.status(HttpStatus.OK).json(posts);
  // }

  // @Get(':movieID')
  // async getMovie(@Res() res:any, @Param('movieID' /*new ValidateObjectId()*/) movieID: string) {
  //   const movie = await this.movieService.getMovie(parseInt(movieID));
  //   if (!movie) {
  //     throw new NotFoundException('Movie does not exist!');
  //   }
  //   return res.status(HttpStatus.OK).json(movie);
  // }

  // @Get('/saveFromApi/:movieId')
  // async saveFromApi(@Res() res, @Param('movieId') movieId) {
  //   const movie: Movie = await this.movieService.getMovieFromApi(movieId);
  //   const newMovie = await this.movieService.addMovie(movie);
  //
  //   if (!newMovie) {
  //     throw new NotFoundException('Movie already exists!');
  //   }
  //   return res.status(HttpStatus.OK).json(newMovie);
  // }

  // @Post()
  // @UseGuards(AuthGuard('jwt'))
  // async addMovie(@Res() res: any, @Body() createPostDTO: CreateSeasonDto) {
  //   const newMovie = await this.movieService.addMovie(createPostDTO);
  //   if (!newMovie) {
  //     throw new NotFoundException('Movie already exists!');
  //   }
  //   return res.status(HttpStatus.OK).json({movie: newMovie});
  // }

  // @Delete(':movieID')
  // @UseGuards(AuthGuard('jwt'))
  // async deletePost(@Res() res: any, @Param('movieID' /*new ValidateObjectId()*/) movieID: string) {
  //   const id = await this.movieService.deleteMovie(parseInt(movieID));
  //   if (!id) {
  //     throw new NotFoundException('Post does not exist!');
  //   }
  //   return res.status(HttpStatus.OK).json({id});
  // }
}
