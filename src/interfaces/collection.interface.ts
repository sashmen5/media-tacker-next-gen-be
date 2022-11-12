import { Document } from 'mongoose';

export interface Collection extends Document {
  id: string;
  userId: string;
  books: [];
  movies: [];
  tvs: [];
  series: [];
}
