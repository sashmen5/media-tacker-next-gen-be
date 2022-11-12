import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie } from '../../interfaces/movie.interface';
import { MOVIE } from '../../constants/constants';
import { CreateMovieDto } from './dto/create-movie-dto';
import { SearchService } from "../search/search.service";


@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MOVIE) private readonly movieModel: Model<Movie>,
    private readonly searchService: SearchService,
  ) { }

  async getMovies(): Promise<Movie[]> {
    const movies = await this.movieModel.find().exec();
    return movies;
  }

  async getMovie(id: number | string): Promise<Movie | null> {
    const movie = await this.movieModel
      .findOne({id})
      .exec();

    return movie;
  }

  async addMovie(createMovieDTO: CreateMovieDto): Promise<Movie | null> {
    const movie = await this.getMovie(createMovieDTO.id);
    if (movie) {
      return null;
    }
    createMovieDTO.creationDate = Date.now();
    const newMovie: Movie = await new this.movieModel(createMovieDTO);
    return newMovie.save();
  }

  async deleteMovie(id: number): Promise<any> {
    await this.movieModel.deleteOne({id});
    return id;
  }

  async getMovieFromApi(id: number | string, searchLanguage: string): Promise<Movie> {
    const movie = await this.searchService.searchMovieById(id, searchLanguage);
    return movie?.data;
  }
}
