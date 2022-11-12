import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  budget: Number,
  genres: Array,
  homepage: String,
  id: Number,
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  revenue: Number,
  runtime: Number,
  status: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  creationDate: Number
});
