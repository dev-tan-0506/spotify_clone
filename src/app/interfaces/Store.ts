/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserLibrary, UserLoginGoogleInfo } from "./User";

export interface AuthStore {
  isAuthencating: boolean;
  user: UserLoginGoogleInfo;
  userLibrary: UserLibrary[];
}

export interface ToastMessageStore {
  open: boolean;
  message: string;
}
