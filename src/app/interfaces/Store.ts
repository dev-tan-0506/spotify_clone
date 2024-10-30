import { UserLibrary, UserLoginGoogleInfo } from "./User";

export interface AuthStore {
  isAuthencating: boolean;
  user: UserLoginGoogleInfo;
  userLibrary: UserLibrary[];
}
