export interface MultiSearchResult {
  'id': number;
  'original_name': string;
  'media_type': 'tv' | 'movie' | 'person';
  'name': string;
  'vote_count': number;
  'vote_average': number;
  'poster_path': string;
  'first_air_date': string;
  'popularity': number;
  'original_title': string;
  'title': string;
  'genre_ids': number[];
  'original_language': string;
  'backdrop_path': string;
  'overview': string;
  'origin_country': string[];
  'release_date': string;
}
