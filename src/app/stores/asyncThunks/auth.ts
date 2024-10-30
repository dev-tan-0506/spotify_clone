/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserLibrary, UserLoginGoogleInfo } from "@/app/interfaces/User";
import useAPI from "@/app/utils/fetchApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const getYourLibrary = createAsyncThunk(
  "auth/getYourLibrary",
  async (_, thunkAPI) => {
    const user: UserLoginGoogleInfo = (thunkAPI.getState() as any).auth.user;
    const urlGetYourLibrary = `users/library/${user._id}`;
    const response = await useAPI.get(urlGetYourLibrary);
    if (response) {
      const { _id, userId, ...library } = response;
      const listLib: UserLibrary[] = [];
      Object.entries(library).forEach((li) => {
        if (li?.[1]) {
          const arr = (li[1] as any[]).map((item) => {
            return {
              item,
              type: li[0],
            };
          }) as UserLibrary[];
          listLib.push(...arr);
        }
        return [];
      });

      return listLib;
    }
  }
);
