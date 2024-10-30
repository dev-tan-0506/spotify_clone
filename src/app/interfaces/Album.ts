import { Singer } from "./Singer";

export interface Album {
  name: string;
  singer: Singer;
  count_listen: number;
  thumb?: string;
  release_time: string;
  active: boolean;
  _id: string;
}
