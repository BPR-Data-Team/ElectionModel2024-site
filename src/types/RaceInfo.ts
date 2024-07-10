import { RaceType } from "./RaceType";
import { State } from "./State";

export interface RaceInfo {
  raceType: RaceType;
  state: State;
  district: number;
}
