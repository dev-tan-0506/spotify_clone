import { Song } from "../interfaces/Song";

export default function usePlaying() {
  const getListNextSongs = (playlist: Song[], indexCurrentSong: number) => {
    if (!playlist || !indexCurrentSong) {
      return [];
    }
    return playlist.filter((song, index) => index > indexCurrentSong);
  };

  return [getListNextSongs];
}
