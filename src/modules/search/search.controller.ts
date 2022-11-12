import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) { }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async multiSearch(@Res() res: any, @Body('query') query: string, @Body('searchLanguage') searchLanguage:string) {
    const results = await this.searchService.multiSearch(query, searchLanguage);
    return res.status(HttpStatus.OK).json(results);
  }
}
