import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import useAPI from "../utils/fetchApi";
import { AuthenticationInfo, UserLoginGoogleInfo } from "../interfaces/User";
import Cookies from "js-cookie";

export interface AuthStore {
  isAuthencating: boolean;
  user: UserLoginGoogleInfo;
}

const authStates: AuthStore = {
  isAuthencating: true,
  user: {
    name: "",
    email: "",
    image: "",
    _id: "",
  },
};

export const handleAuthen = createAsyncThunk(
  "auth/handleAuthen",
  async (data?: UserLoginGoogleInfo) => {
    if (!data) {
      return;
    }
    const url = "auth/login-google";

    const response = await useAPI.post(url, data);
    if (response) {
      return response;
    }
  }
);

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
      });
  },
});

export const selectIsAuthencating = (state: RootState) => state.auth;
export const selectUserLoginInfo = (state: RootState) => state.auth.user;

export const { setIsAuthencating } = authStore.actions;

export default authStore.reducer;
