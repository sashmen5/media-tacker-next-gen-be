import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { SERIE_CONTROLLER } from "../../constants/constants";
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie-dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../interfaces/user.interface';
import { SeasonService } from "../seasons/season.service";
import { Serie } from "../../interfaces/serie.interface";
import { toSerie } from "./serie.utils";

export interface RequestWithUser extends Request {
  user: User;
}

@Controller(SERIE_CONTROLLER)
export class SerieController {
  constructor(private serieService: SerieService, private seasonService: SeasonService) { }

  @Get('all')
  // @UseGuards(AuthGuard('jwt'))
  async getSeries(@Res() res:any, @Req() request: RequestWithUser) {
    const posts = await this.serieService.getSeries();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get(':id')
  async getSerie(@Res() res:any, @Param('id' /*new ValidateObjectId()*/) id: string) {
    const serie = await this.serieService.getSerie(parseInt(id));
    if (!serie) {
      throw new NotFoundException('Serie does not exist!');
    }
    return res.status(HttpStatus.OK).json(serie);
  }

  @Get(':id/seasons')
  async getSerieWidthSeasons(@Res() res:any, @Param('id' /*new ValidateObjectId()*/) id: string) {
    console.log('Hello seasons')
    const serie = await this.serieService.getSerie(parseInt(id));
    if (!serie) {
      throw new NotFoundException('Serie does not exist!');
    }

    const seasonNumbers = serie.seasons.map(season => season.seasonNumber);
    console.log('seasonNumbers', seasonNumbers);
    const seasons = await this.seasonService.getSeasonsFromApi(serie.id, seasonNumbers);

    console.log('seasons');
    return res.status(HttpStatus.OK).json({
      serie,
      seasons
    });
  }

  // @Get('/saveFromApi/:movieId')
  // async saveFromApi(@Res() res, @Param('movieId') movieId) {
  //   const movie: Movie = await this.serieService.getMovieFromApi(movieId);
  //   const newMovie = await this.serieService.addMovie(movie);
  //
  //   if (!newMovie) {
  //     throw new NotFoundException('Movie already exists!');
  //   }
  //   return res.status(HttpStatus.OK).json(newMovie);
  // }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addMovie(@Res() res: any, @Body() createPostDTO: CreateSerieDto) {
    const newMovie = await this.serieService.addSerie(createPostDTO);
    if (!newMovie) {
      throw new NotFoundException('Movie already exists!');
    }
    return res.status(HttpStatus.OK).json({movie: newMovie});
  }

  @Put('refresh/:id')
  @UseGuards(AuthGuard('jwt'))
  async refreshSerie(@Res() res: any, @Param('id') id: number, @Body('searchLanguage') searchLanguage: string): Promise<Serie> {
      await this.serieService.deleteSerie(id);
      const tmdbSerie = await this.serieService.getSerieFromApi(id, searchLanguage);
      const newSerie = toSerie(tmdbSerie) as Serie;
      await this.serieService.addSerie(newSerie);
      return res.status(HttpStatus.OK).json({serie: newSerie});
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteSerie(@Res() res: any, @Param('id' /*new ValidateObjectId()*/) movieID: string) {
    const id = await this.serieService.deleteSerie(parseInt(movieID));
    if (!id) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({id});
  }
}
