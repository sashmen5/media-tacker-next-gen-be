import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as Process from "process";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // console.log(Process.env)
    return this.appService.getHello();
  }
}
