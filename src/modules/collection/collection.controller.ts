import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, HttpStatus, Param, Put, Req, Res, UseGuards } from '@nestjs/common';

import { CollectionService } from './collection.service';
import { MovieService } from '../movie/movie.service';
import { Movie } from '../../interfaces/movie.interface';
import { RequestWithUser } from '../movie/movie.controller';
import { User } from '../../interfaces/user.interface';
import { Serie } from "../../interfaces/serie.interface";
import { SerieService } from "../serie/serie.service";

@Controller('collection')
export class CollectionController {
  constructor(
    private collectionService: CollectionService,
    private movieService: MovieService,
    private serieService: SerieService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCollection(@Res() res :any, @Req() request: RequestWithUser) {
    const { id }: User = request.user;
    const collection = await this.collectionService.getCollectionByUserId(id);
    return res.status(HttpStatus.OK).json({collection});
  }
  @Put('addMovie/:movieId')
  @UseGuards(AuthGuard('jwt'))
  async addMovie(@Res() res: any, @Param('movieId') movieId: number, @Body('searchLanguage') searchLanguage: string): Promise<Movie> {
    let movie = await this.movieService.getMovie(movieId);
    if (!movie) {
      movie = await this.movieService.getMovieFromApi(movieId, searchLanguage);
      await this.movieService.addMovie(movie);
      return res.status(HttpStatus.OK).json({movie});
    }

    return res.status(HttpStatus.BAD_REQUEST).json({error: 'some error'});
  }

  @Put('addSerie/:id')
  @UseGuards(AuthGuard('jwt'))
  async addSerie(@Res() res: any, @Param('id') id: number, @Body('searchLanguage') searchLanguage: string): Promise<Serie> {
    let serie = await this.serieService.getSerie(id);
    if (!serie) {
      serie = await this.serieService.getSerieFromApi(id, searchLanguage);
      await this.serieService.addSerie(serie);
      return res.status(HttpStatus.OK).json({serie});
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
    console.log('itemFromUserCollection', itemFromUserCollection)
    if (!itemFromUserCollection) {

      await this.collectionService.addMovie(id, movieId, status);
    } else {
      await this.collectionService.updateMovieStatus(id, movieId, status);
    }

    return res.status(HttpStatus.OK).json({movieId, status});
  }

  @Put('updateSerieStatus')
  @UseGuards(AuthGuard('jwt'))
  async updateSerieStatus(@Res() res: any, @Req() request: RequestWithUser, @Body('id') serieId: string, @Body('status') status: string) {
    const serie = await this.serieService.getSerie(serieId);
    const { id }: User = request.user;
    if (!serie) {
      return res.status(HttpStatus.NO_CONTENT).json({error: {message: 'Serie not exists'}});
    }
    const query = {'userId': id, 'series.id': serieId};
    const itemFromUserCollection = await this.collectionService.getCollection(query);
    console.log('itemFromUserCollection', itemFromUserCollection)
    if (!itemFromUserCollection) {
      await this.collectionService.addSerie(id, serieId, status);
    } else {
      await this.collectionService.updateSerieStatus(id, serieId, status);
    }

    return res.status(HttpStatus.OK).json({serieId: serieId, status});
  }
}
