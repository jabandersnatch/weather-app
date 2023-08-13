import { Coord } from './Coord';
import { Weather } from './Weather';
import { Main } from './Main';
import { Wind } from './Wind';
import { Clouds } from './Clouds';
import { Sys } from './Sys';

export interface WeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
