import { Document } from "mongoose";
import { Dictionary, NumericDictionary } from "../types";

export interface Crew {
   department: string;
   job: string;
   credit_id: string;
   adult: boolean;
   gender: number;
   id: number;
   known_for_department: string;
   name: string;
   original_name: string;
   popularity: number;
   profile_path: string;
 }
 export interface GuestStar {
   credit_id: string;
   order: number;
   character: string;
   adult: boolean;
   gender: number;
   id: number;
   known_for_department: string;
   name: string;
   original_name: string;
   popularity: number;
   profile_path: string;
 }
 export interface Episode {
   air_date: string;
   episode_number: number;
   crew: Crew[];
   guest_stars: GuestStar[];
   id: number;
   name: string;
   overview: string;
   production_code: string;
   season_number: number;
   still_path: string;
   vote_average: number;
   vote_count: number;
 }
 export interface SeasonTMDB {
   _id: string;
   air_date: string;
   episodes: Episode[];
   name: string;
   overview: string;
   id: number;
   poster_path: string;
   season_number: number;
}

export interface SeasonStatus extends Document {
  id: number;
  serieId: number;
  episodes?: NumericDictionary<{id: number, date?: number}>
}

export interface WatchedEpisode {
  episodeId: number;
  serieId: number;
  seasonId: number;
}



