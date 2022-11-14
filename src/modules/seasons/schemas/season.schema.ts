import * as mongoose from 'mongoose';

export const SeasonSchema = new mongoose.Schema({
  id: Number,
  serieId: Number,
  episodes: Object
});
