import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async multiSearch(query: string, searchLanguage: string) {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=${searchLanguage}&query=${query}&page=1&include_adult=true`;
    const result = await this.httpService.get(url).toPromise();
    return result?.data;
  }

  async searchMovieById(id: number | string, searchLanguage: string) {
    const url: string = `https://api.themoviedb.org/3/movie/${id}?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=${searchLanguage}`;
    const movie = await this.httpService.get(url).toPromise();
    return movie;
  }

  async searchTvById(id: number | string) {
    const result = await this.searchById(id, 'tv');
    return result;
  }

  async searchPeopleById(id: number | string) {
    const result = await this.searchById(id, 'person');
    return result;
  }

  private async searchById(id: number | string, mediaType: string) {
    const url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=d7bc2bebb66a0150abc3308cdd4e9d50&language=en-US&query=${id}&page=1&include_adult=false`;
    const result = await this.httpService.get(url).toPromise();
    return result?.data;
  }
}
