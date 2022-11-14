import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSeasonDto } from './dto/create-season-dto';
import { SearchService } from "../search/search.service";
import { SEASON } from "../../constants/constants";
import { SeasonStatus, SeasonTMDB, WatchedEpisode } from "../../interfaces/season.interface";


@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(SEASON) private readonly seasonModel: Model<SeasonStatus>,
    private readonly searchService: SearchService,
  ) { }

  // async getMovies(): Promise<Movie[]> {
  //   const movies = await this.movieModel.find().exec();
  //   return movies;
  // }

  async getSeasonStatus(id: number | string): Promise<SeasonStatus | null> {
    const season = await this.seasonModel
      .findOne({id})
      .exec();

    return season;
  }

  async getSeasonStatusBySerie(serieId: number | string): Promise<SeasonStatus[] | null> {
    const season = await this.seasonModel
      .find({serieId})
      .exec();

    return season;
  }

  async addSeason(createSeasonDTO: CreateSeasonDto): Promise<SeasonStatus | null> {
    const newMovie: SeasonStatus = await new this.seasonModel(createSeasonDTO);
    return newMovie.save();
  }

  async getSeason(id: number, serieId: number): Promise<SeasonStatus | null> {
    return await this.seasonModel.findOne({id, serieId}).exec()
  }

  async setWatchSerie(episode: WatchedEpisode): Promise<SeasonStatus | null> {
    const season = await this.getSeason(episode.seasonId, episode.serieId);
    console.log('season', season)
    if (!season) {
      const seasonDTO: CreateSeasonDto = {
        id: episode.seasonId,
        serieId: episode.serieId,
        episodes: { [episode.episodeId]: { id: episode.episodeId, date: Date.now() } }
      }
      console.log('seasonDTO', seasonDTO)
      return await this.addSeason(seasonDTO);
    }

    const seasonDTO: CreateSeasonDto = {
      id: season.id,
      serieId: season.serieId,
      episodes: {
        ...season.episodes,
        [episode.episodeId]: { id: episode.episodeId, date: Date.now() }
      }
    }

    await this.deleteSeason(episode.seasonId);
    return await this.addSeason(seasonDTO);
  }

  async deWatchSerie(episode: WatchedEpisode): Promise<SeasonStatus | null> {
    const season = await this.getSeason(episode.seasonId, episode.serieId);

    console.log('season', season)
    if (!season) {
      return null;
    }

    delete season.episodes?.[episode.episodeId];

    const seasonDTO: CreateSeasonDto = {
      id: season.id,
      serieId: season.serieId,
      episodes: season.episodes
    }

    await this.deleteSeason(episode.seasonId);
    return await this.addSeason(seasonDTO);
  }





  async deleteSeason(id: number): Promise<any> {
    await this.seasonModel.deleteOne({id});
    return id;
  }




  async getSeasonsFromApi(serieId: number | string, seasonNumbers: number[]): Promise<SeasonTMDB[]> {
    const res: SeasonTMDB[] = [];
    for (let seasonNumber of seasonNumbers) {
      const season = await this.searchService.searchSeasonByNumber(serieId, seasonNumber, 'ru-RU');
      res.push(season.data);
    }

    return res
  }
}
