import { Body, Controller, HttpStatus, Put, Res, UseGuards } from "@nestjs/common";

import { SEASON_CONTROLLER } from "../../constants/constants";
import { SeasonService } from './season.service';
import { User } from '../../interfaces/user.interface';
import { AuthGuard } from "@nestjs/passport";
import { WatchedEpisode } from "../../interfaces/season.interface";

@Controller(SEASON_CONTROLLER)
export class SeasonController {
  constructor(private seasonService: SeasonService) { }

  @Put('watchEpisode')
  @UseGuards(AuthGuard('jwt'))
  async watchEpisode(@Res() res: any, @Body() body: WatchedEpisode) {
    const season = this.seasonService.setWatchSerie(body);
    return res.status(HttpStatus.OK).json({season: season});
  }

  @Put('deWatchEpisode')
  @UseGuards(AuthGuard('jwt'))
  async deWatchEpisode(@Res() res: any, @Body() body: WatchedEpisode) {
    const season = this.seasonService.deWatchSerie(body);
    return res.status(HttpStatus.OK).json({season: season});
  }
}
