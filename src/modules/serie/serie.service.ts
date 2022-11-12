import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie } from '../../interfaces/movie.interface';
import { MOVIE, SERIE } from "../../constants/constants";
import { Serie } from "../../interfaces/serie.interface";
import { CreateSerieDto } from './dto/create-serie-dto';
import { SearchService } from "../search/search.service";


@Injectable()
export class SerieService {
  constructor(
    @InjectModel(SERIE) private readonly serieModel: Model<Serie>,
    private readonly searchService: SearchService,
  ) { }

  async getSeries(): Promise<Serie[]> {
    const series = await this.serieModel.find().exec();
    return series;
  }

  async getSerie(id: number | string): Promise<Serie | null> {
    const movie = await this.serieModel
      .findOne({id})
      .exec();

    return movie;
  }

  async addSerie(createSerieDTO: CreateSerieDto): Promise<Serie | null> {
    const serie = await this.getSerie(createSerieDTO.id);
    if (serie) {
      return null;
    }
    createSerieDTO.creationDate = Date.now();
    const newMovie = await new this.serieModel(createSerieDTO);
    return newMovie.save();
  }

  async deleteSerie(id: number): Promise<any> {
    await this.serieModel.deleteOne({id});
    return id;
  }

  async getSerieFromApi(id: number | string, searchLanguage: string): Promise<Serie> {
    console.log('getSerieFromApi')
    const serie = await this.searchService.searchTvById(id, searchLanguage);
    return serie?.data;
  }
}
