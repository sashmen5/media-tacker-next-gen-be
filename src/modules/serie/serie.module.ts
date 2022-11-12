import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SerieController } from './serie.controller';
import { SerieService } from './serie.service';
import { SerieSchema } from './schemas/serie.schema';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Serie', schema: SerieSchema }]),
    SearchModule
  ],
  controllers: [SerieController],
  providers: [SerieService],
  exports: [SerieService]
})
export class SerieModule {}
