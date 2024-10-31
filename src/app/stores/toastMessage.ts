import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { toastMessageState } from "./states/toastMessage";

export const toastMessageStore = createSlice({
  name: "toastMessage",
  initialState: toastMessageState,
  reducers: {
    openToastMessage: (state, { payload }: PayloadAction<string>) => {
      state.open = true;
      state.message = payload;
    },
    closeToastMessage: (state) => {
      state.open = false;
    },
  },
});

export const selectToastMessage = (state: RootState) => state.toastMessage;

export const { openToastMessage, closeToastMessage } =
  toastMessageStore.actions;

export default toastMessageStore.reducer;
