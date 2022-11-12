import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from '../../interfaces/collection.interface';
import { MovieService } from '../movie/movie.service';
import { Movie } from '../../interfaces/movie.interface';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../movie/movie.controller';
import { User } from '../../interfaces/user.interface';

@Controller('collection')
export class CollectionController {
  constructor(
    private collectionService: CollectionService,
    private movieService: MovieService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCollection(@Res() res :any, @Req() request: RequestWithUser) {
    const { id }: User = request.user;
    const collection = await this.collectionService.getCollectionByUserId(id);
    return res.status(HttpStatus.OK).json({collection});
  }
  // TODO: check if works
  @Put('addMovie/:movieId')
  @UseGuards(AuthGuard('jwt'))
  async addMovieToCollection(@Res() res: any, @Param('movieId') movieId: number, @Body('searchLanguage') searchLanguage: string): Promise<Movie> {
    let movie = await this.movieService.getMovie(movieId);
    if (!movie) {
      movie = await this.movieService.getMovieFromApi(movieId, searchLanguage);
      await this.movieService.addMovie(movie);
      return res.status(HttpStatus.OK).json({movie});
    }

    return res.status(HttpStatus.BAD_REQUEST).json({error: 'some error'});
  }

  @Put('updateMovieStatus')
  @UseGuards(AuthGuard('jwt'))
  async updateMovieStatus(@Res() res: any, @Req() request: RequestWithUser, @Body('movieId') movieId: string, @Body('status') status: string) {
    const movie = await this.movieService.getMovie(movieId);
    const { id }: User = request.user;
    if (!movie) {
      return res.status(HttpStatus.NO_CONTENT).json({error: {message: 'Movie not exists'}});
    }
    const query = {'userId': id, 'movies.id': movieId};
    const itemFromUserCollection = await this.collectionService.getCollection(query);
    if (!itemFromUserCollection) {
      await this.collectionService.addMovie(id, movieId, status);
    } else {
      await this.collectionService.updateMovieStatus(id, movieId, status);
    }

    return res.status(HttpStatus.OK).json({movieId, status});
  }
}
