import * as mongoose from 'mongoose';

export const SerieSchema = new mongoose.Schema({
  id: Number,
  created_by: Array,
  episode_run_time: Array,
  first_air_date: String,
  backdrop_path: String,
  genres: Array,
  origin_country: Array,
  in_production: Boolean,
  last_air_date: String,
  homepage: String,
  name: String,
  languages: Array,
  last_episode_to_air: Object,
  next_episode_to_air: Object,
  networks: Array,
  number_of_episodes: Number,
  number_of_seasons: Number,

  original_title: String,
  overview: String,
  release_date: String,
  revenue: Number,
  runtime: Number,
  status: String,
  title: String,
  video: Boolean,

  popularity: Number,
  poster_path: String,
  original_language: String,
  original_name: String,

  production_companies: Array,
  production_countries: Array,
  seasons: Array,
  spoken_languages: Array,
  tagline: String,
  type: String,
  vote_average: Number,
  creationDate: Number,
  vote_count: Number,
});