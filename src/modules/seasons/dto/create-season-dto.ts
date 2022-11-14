import { NumericDictionary } from "../../../types";

export class CreateSeasonDto {
  id: number;
  serieId: number;
  episodes?: NumericDictionary<{id: number, date?: number}>
}
