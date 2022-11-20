import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from "rxjs";
import { SeasonTMDB } from "../../interfaces/season.interface";
import { Movie } from "../../interfaces/movie.interface";
import { TmdbSerie } from "../../interfaces/serie.interface";

interface Paginator<T extends unknown> {
  page?: number;
  total_pages?: number;
  total_results?: number;
  results?: T[];
}

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async multiSearch(query: string, searchLanguage: string) {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=${searchLanguage}&query=${query}&page=1&include_adult=true`;
    const result = await firstValueFrom(this.httpService.get(url))
    return result?.data;
  }

  async searchMovieById(id: number | string, searchLanguage: string) {
    const url: string = `https://api.themoviedb.org/3/movie/${id}?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=${searchLanguage}`;
    return await firstValueFrom(this.httpService.get(url));
  }

  async searchTvById(id: number | string, searchLanguage: string) {
    const url: string = `https://api.themoviedb.org/3/tv/${id}?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=${searchLanguage}`;
    return await firstValueFrom(this.httpService.get(url));
  }

  async searchSeasonByNumber(serieId: number | string,seasonNumber: number, searchLanguage: string) {
    const url: string = `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=${searchLanguage}`;
    return await firstValueFrom(this.httpService.get<SeasonTMDB>(url));
  }

  async searchPeopleById(id: number | string) {
    const result = await this.searchById(id, 'person');
    return result;
  }

  private async searchById(id: number | string, mediaType: string) {
    const url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=en-US&query=${id}&page=1&include_adult=false`;
    const result = await firstValueFrom(this.httpService.get(url));
    return result?.data;
  }

  async popularMovies(page: number, language: string) {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=${language}&page=${page}`;
    const result = await firstValueFrom(this.httpService.get<Paginator<Movie>>(url));
    return result?.data;
  }

  async popularSeries(page: number, language: string) {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=${language}&page=${page}`;
    const result = await firstValueFrom(this.httpService.get<Paginator<TmdbSerie>>(url));
    return result?.data;
  }
}
