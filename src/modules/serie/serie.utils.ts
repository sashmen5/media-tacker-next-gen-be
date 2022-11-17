import { Serie, TmdbSerie } from "../../interfaces/serie.interface";

export function toSerie(tmdbSerie: TmdbSerie): Partial<Serie> {
  return {
    creationDate: tmdbSerie.creationDate,
    genres: tmdbSerie?.genres?.map(el => ({name: el.name, id: el.id})) || [],
    seasons: tmdbSerie?.seasons?.map(el => ({name: el.name, id: el.id, airDate: el.air_date, episodeCount: el.episode_count, seasonNumber: el.season_number, posterPath: el.poster_path, overview: el.overview})) || [],
    inProduction: tmdbSerie.in_production,

    lastAirDate: tmdbSerie.last_air_date,
    backdropPath: tmdbSerie.backdrop_path,
    episodeRunTime: tmdbSerie.episode_run_time,
    firstAirDate: tmdbSerie.first_air_date,
    homepageUrl: tmdbSerie.homepage,
    name: tmdbSerie.name,
    originalName: tmdbSerie.original_name,
    overview: tmdbSerie.overview,
    posterPath: tmdbSerie.poster_path,
    id: tmdbSerie.id,
    popularity: tmdbSerie.popularity,
    status: tmdbSerie.status,
    type: tmdbSerie.type,
    voteAverage: tmdbSerie.vote_average,
    voteCount: tmdbSerie.vote_count

  }
}
