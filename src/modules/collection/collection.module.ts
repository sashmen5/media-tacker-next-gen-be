import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { CollectionSchema } from './schemas/collection.schema';
import { MovieModule } from '../movie/movie.module';
import { SerieModule } from "../serie/serie.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Collection', schema: CollectionSchema }]),
    MovieModule,
    SerieModule,
  ],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService]
})
export class CollectionModule {}
