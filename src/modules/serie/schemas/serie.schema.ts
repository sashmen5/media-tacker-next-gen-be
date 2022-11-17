import * as mongoose from 'mongoose';

export const SerieSchema = new mongoose.Schema({
  id: Number,
  backdropPath: String,
  firstAirDate: String,
  homepageUrl: String,
  inProduction: Boolean,
  lastAirDate: String,
  name: String,
  originalName: String,
  overview: String,
  popularity: Number,
  posterPath: String,
  status: String,
  type: String,
  voteAverage: Number,
  voteCount: Number,
  creationDate: Number,
  episodeRunTime: Array,
  genres: Array,
  seasons: Array,
});
