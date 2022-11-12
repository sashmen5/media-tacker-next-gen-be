import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { COLLECTION } from '../../constants/constants';
import { Collection } from '../../interfaces/collection.interface';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Injectable()
export class CollectionService {
  constructor(@InjectModel(COLLECTION) private readonly collectionModel: Model<Collection>) {}

  async createCollection(userId: string): Promise<Collection> {
    const collectionDto: CreateCollectionDto = {
      id: randomStringGenerator(),
      books: [],
      movies: [],
      series: [],
      tvs: [],
      userId
    };
    const newCollection = await new this.collectionModel(collectionDto);
    return newCollection.save();
  }

  async getCollectionByUserId(userId: string): Promise<Collection | null> {
    const collection = await this.getCollection({userId});
    return collection;
  }

  async getCollection(query: object): Promise<Collection | null> {
    const collection: Collection | null = await this.collectionModel
      .findOne(query)
      .exec();
    return collection;
  }

  async addMovie(userId: string, movieId: string, status: string): Promise<any> {
    const result = await this.collectionModel
      .updateOne(
        { userId },
        {
          $push: {
            movies: {
              id: movieId,
              statuses: [{
                name: status,
                date: Date.now()
              }]
            }
          }
        }
      );
  }

  async updateMovieStatus(userId: string, movieId: string, status: string ): Promise<any> {
    const result = await this.collectionModel
      .updateOne(
       {
          'userId': userId,
          'movies.id': movieId
        },
        {
          $push: {
            'movies.$.statuses': {
              name: status,
              date: Date.now()
            }
          }
        }
      );
  }
}
