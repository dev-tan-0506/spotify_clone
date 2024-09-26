import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import playingStore from "./playingStore";

export const makeStore = () => {
  return configureStore({
    reducer: {
      playing: playingStore
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
