import { Song } from "./Song";

export type PlayListTypes = "private" | "public" | "liked";

export interface Playlist {
  _id: string;
  name: string;
  count_listens: number;
  thumb: string;
  songs: Song[] | string[];
  userCreated: string;
  isDeleted: boolean;
  folder: string;
  type: PlayListTypes;
  description: string;
}
