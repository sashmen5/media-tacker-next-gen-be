import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { MOVIE_CONTROLLER } from '../../constants/constants';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie-dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../interfaces/user.interface';

export interface RequestWithUser extends Request {
  user: User;
}

@Controller(MOVIE_CONTROLLER)
export class MovieController {
  constructor(private movieService: MovieService) { }

  @Get('all')
  // @UseGuards(AuthGuard('jwt'))
  async getMovies(@Res() res:any, @Req() request: RequestWithUser) {
    const posts = await this.movieService.getMovies();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get(':movieID')
  async getMovie(@Res() res:any, @Param('movieID' /*new ValidateObjectId()*/) movieID: string) {
    const movie = await this.movieService.getMovie(parseInt(movieID));
    if (!movie) {
      throw new NotFoundException('Movie does not exist!');
    }
    return res.status(HttpStatus.OK).json(movie);
  }

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

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addMovie(@Res() res: any, @Body() createPostDTO: CreateMovieDto) {
    const newMovie = await this.movieService.addMovie(createPostDTO);
    if (!newMovie) {
      throw new NotFoundException('Movie already exists!');
    }
    return res.status(HttpStatus.OK).json({movie: newMovie});
  }


  @Post('/refresh/:id')
  @UseGuards(AuthGuard('jwt'))
  async refreshMovie(@Res() res: any, @Param('id') id: string) {
    const newMovie = await this.movieService.refreshMovie(parseInt(id), 'ru-RU');
    if (!newMovie) {
      throw new NotFoundException('Failed');
    }
    return res.status(HttpStatus.OK).json({movie: newMovie});
  }

  @Delete(':movieID')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Res() res: any, @Param('movieID' /*new ValidateObjectId()*/) movieID: string) {
    const id = await this.movieService.deleteMovie(parseInt(movieID));
    if (!id) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({id});
  }
}
