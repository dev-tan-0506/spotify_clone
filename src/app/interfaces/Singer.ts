import { Song } from "./Song";

export interface Singer {
  name: string;
  avatar: string;
  verifiedArtist: boolean;
  coverImage?: string;
  _id: string;
  songs: Song[]
}
