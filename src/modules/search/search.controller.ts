import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from '@nestjs/passport';
import { toSerie } from "../serie/serie.utils";

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async multiSearch(@Res() res: any, @Body('query') query: string, @Body('searchLanguage') searchLanguage:string) {
    const results = await this.searchService.multiSearch(query, searchLanguage);
    return res.status(HttpStatus.OK).json(results);
  }

  @Get('/movie/popular/:page')
  @UseGuards(AuthGuard('jwt'))
  async popularMovies(@Res() res: any, @Param('page') pageParam: string) {
    const page = parseInt(pageParam, 10) || 1;

    const results = await this.searchService.popularMovies(page, 'ru-RU');
    return res.status(HttpStatus.OK).json(results);
  }


  @Get('/series/popular/:page')
  @UseGuards(AuthGuard('jwt'))
  async popularSeries(@Res() res: any, @Param('page') pageParam: string) {
    const page = parseInt(pageParam, 10) || 1;

    const results = await this.searchService.popularSeries(page, 'ru-RU');
    const final = {
      ...results,
      results: results?.results?.map(toSerie)
    }
    return res.status(HttpStatus.OK).json(final);
  }
}
