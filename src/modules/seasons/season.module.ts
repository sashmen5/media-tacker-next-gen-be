import { Module } from '@nestjs/common';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeasonSchema } from './schemas/season.schema';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Season', schema: SeasonSchema }]),
    SearchModule
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [SeasonService]
})
export class SeasonModule {}
