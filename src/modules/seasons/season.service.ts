import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSeasonDto } from './dto/create-season-dto';
import { SearchService } from "../search/search.service";
import { SEASON } from "../../constants/constants";
import { Season } from "../../interfaces/serie.interface";
import { SeasonTMDB } from "../../interfaces/season.interface";


@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(SEASON) private readonly seasonModel: Model<Season>,
    private readonly searchService: SearchService,
  ) { }

  // async getMovies(): Promise<Movie[]> {
  //   const movies = await this.movieModel.find().exec();
  //   return movies;
  // }

  // async getMovie(id: number | string): Promise<Movie | null> {
  //   const movie = await this.movieModel
  //     .findOne({id})
  //     .exec();
  //
  //   return movie;
  // }

  // async addMovie(createMovieDTO: CreateSeasonDto): Promise<Movie | null> {
  //   const movie = await this.getMovie(createMovieDTO.id);
  //   if (movie) {
  //     return null;
  //   }
  //   createMovieDTO.creationDate = Date.now();
  //   const newMovie: Movie = await new this.movieModel(createMovieDTO);
  //   return newMovie.save();
  // }

  // async deleteMovie(id: number): Promise<any> {
  //   await this.movieModel.deleteOne({id});
  //   return id;
  // }

  async getSeasonsFromApi(serieId: number | string, seasonNumbers: number[]): Promise<SeasonTMDB[]> {
    const res: SeasonTMDB[] = [];
    for (let seasonNumber of seasonNumbers) {
      const season = await this.searchService.searchSeasonByNumber(serieId, seasonNumber, 'ru-RU');
      res.push(season.data);
    }

    return res
  }
}
