import { Song } from "./Song";

export interface Playlist {
  name: string;
  count_listens: number;
  thumb: string;
  songs: Song[];
  userCreated: string;
  isDeleted: boolean;
  folder: string;
}
