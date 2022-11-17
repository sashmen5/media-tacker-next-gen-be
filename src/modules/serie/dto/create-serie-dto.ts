export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface CreateSerieDto {
  id: number;
  backdropPath: string;
  firstAirDate: string;
  homepageUrl: string;
  inProduction: boolean;
  lastAirDate: string;
  name: string;
  originalName: string;
  overview: string;
  popularity: number;
  posterPath: string;
  status: string;
  type: string;
  voteAverage: number;
  voteCount: number;
  creationDate: number;
  episodeRunTime: number[];
  genres: Genre[];
  seasons: {
    id: number;
    airDate: string;
    episodeCount: number;
    name: string;
    overview: string;
    posterPath: string;
    seasonNumber: number;
  }[];
}

