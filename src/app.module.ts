import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_PROVIDER } from "./constants/constants";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { MovieModule } from "./modules/movie/movie.module";
import { CollectionModule } from "./modules/collection/collection.module";
import { SerieModule } from "./modules/serie/serie.module";

@Module({
  imports: [
    MongooseModule.forRoot(DB_PROVIDER, { useNewUrlParser: true }),
    AuthModule,
    UserModule,
    MovieModule,
    SerieModule,
    CollectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
