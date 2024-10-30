import { Album } from "./Album";
import { Playlist } from "./Playlist";
import { Singer } from "./Singer";
import { Song } from "./Song";

export interface UserLoginGoogleInfo {
  name: string;
  email: string;
  image: string;
  _id: string;
}

export interface AuthenticationInfo {
  access_token: string;
  user: UserLoginGoogleInfo;
}

export type ItemTypeUserLibrary = "playlists" | "singles" | "singers" | "albums";

export interface UserLibrary {
  item: Playlist | Song | Singer | Album;
  type: ItemTypeUserLibrary;
}
