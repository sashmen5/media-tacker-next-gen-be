import * as mongoose from 'mongoose';

export const CollectionSchema = new mongoose.Schema({
  id: String,
  userId: String,
  books: Array,
  movies: Array,
  tvs: Array,
  series: Array
});
