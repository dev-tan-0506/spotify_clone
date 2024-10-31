import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { AuthenticationInfo, UserLibrary } from "../interfaces/User";
import Cookies from "js-cookie";
import { getYourLibrary, handleAuthen } from "./asyncThunks/auth";
import { authStates } from "./states/auth";
import { Playlist } from "../interfaces/Playlist";

export const authStore = createSlice({
  name: "auth",
  initialState: authStates,
  reducers: {
    setIsAuthencating: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthencating = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAuthen.pending, (state) => {
        state.isAuthencating = true;
      })
      .addCase(
        handleAuthen.fulfilled,
        (state, { payload }: PayloadAction<AuthenticationInfo | undefined>) => {
          state.isAuthencating = false;
          if (payload) {
            Cookies.set("access_token", payload.access_token, {
              expires: 1 / 24,
            });
            state.user = payload.user;
          }
        }
      )
      .addCase(handleAuthen.rejected, (state, { error }) => {
        state.isAuthencating = false;
        console.error(error);
      })
      .addCase(
        getYourLibrary.fulfilled,
        (state, { payload }: PayloadAction<UserLibrary[] | undefined>) => {
          if (payload) {
            state.userLibrary = payload;
          }
        }
      )
      .addCase(getYourLibrary.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export const selectIsAuthencating = (state: RootState) => state.auth;
export const selectUserLoginInfo = (state: RootState) => state.auth.user;
export const selectUserLibrary = (state: RootState) => state.auth.userLibrary;
export const selectLikedSongsPl = (state: RootState) => {
  return state.auth.userLibrary.find(
    ({ item, type }: UserLibrary) =>
      type === "playlists" && (item as Playlist).type === "liked"
  );
};

export const { setIsAuthencating } = authStore.actions;

export default authStore.reducer;
