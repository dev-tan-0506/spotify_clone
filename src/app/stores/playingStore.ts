import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Song } from "../interfaces/Song";
import { getAPI } from "../utils/fetchApi";

export interface PlayingStore {
  playlist: Song[];
  playlistShuffled: Song[];
  isLoading: boolean;
  playingSong: number;
  isPlaying: boolean;
  isShuffle: boolean;
}

// Define the initial state using that type
const playingStates: PlayingStore = {
  playingSong: 0,
  playlist: [],
  playlistShuffled: [],
  isLoading: false,
  isPlaying: false,
  isShuffle: false,
};

export const getPlaylist = createAsyncThunk("playing/getPlaylist", async () => {
  const url = `http://localhost:3001/songs`;
  const songs: Song[] = await getAPI(url);
  if (songs) {
    return songs;
  }
});

const shufflePlaylist = (songs: Song[], currentSong: number): Song[] => {
  const nextSongs = songs.filter((song, index) => index > currentSong);
  const prevCurrentSongs = songs.filter((song, index) => index <= currentSong);
  const nextSongsShuffled = nextSongs.sort(() => 0.5 - Math.random());
  return [...prevCurrentSongs, ...nextSongsShuffled];
};

export const playingStore = createSlice({
  name: "playing",
  initialState: playingStates,
  reducers: {
    changePlayingSong: (state, { payload }: PayloadAction<number>) => {
      state.playingSong = payload;
    },
    setIsPlaying: (state, { payload }: PayloadAction<boolean>) => {
      state.isPlaying = payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setPlaylist: (state, { payload }: PayloadAction<Song[]>) => {
      state.playlist = payload;
    },
    handleShufflePlaylist: (state) => {
      state.playlistShuffled = state.isShuffle
        ? shufflePlaylist(state.playlist, state.playingSong)
        : state.playlist;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getPlaylist.fulfilled,
        (state, { payload }: PayloadAction<Song[] | undefined>) => {
          state.isLoading = false;
          if (payload) {
            state.playlist = payload;
            state.playlistShuffled = payload;
          }
        }
      )
      .addCase(getPlaylist.rejected, (state, { error }) => {
        state.isLoading = false;
        console.error(error);
      });
  },
});

export const selectPlayingState = (state: RootState) => state.playing;
export const selectIndexSongPlaying = (state: RootState) =>
  state.playing.playingSong;
export const selectIsPlaying = (state: RootState) => state.playing.isPlaying;
export const selectIsShuffle = (state: RootState) => state.playing.isShuffle;
export const selectSongPlaying = (state: RootState) => {
  const index = state.playing.playingSong;
  const playlist = state.playing.playlistShuffled;
  return playlist[index] || {};
};
export const selectNextSongs = (state: RootState) => {
  const indexSongPlaying = state.playing.playingSong;
  const playlist = state.playing.playlistShuffled;
  return playlist.filter((song, index) => index > indexSongPlaying);
};
export const getIsNextSong = (state: RootState) => {
  const indexSongPlaying = state.playing.playingSong;
  const playlist = state.playing.playlistShuffled;
  return !!playlist[indexSongPlaying + 1];
};
export const getIsPrevSong = (state: RootState) => {
  const indexSongPlaying = state.playing.playingSong;
  const playlist = state.playing.playlistShuffled;
  return !!playlist[indexSongPlaying - 1];
};
export const selectPlaylist = (state: RootState) =>
  state.playing.playlistShuffled;

export const {
  changePlayingSong,
  setIsPlaying,
  toggleShuffle,
  setPlaylist,
  handleShufflePlaylist,
} = playingStore.actions;

export default playingStore.reducer;
