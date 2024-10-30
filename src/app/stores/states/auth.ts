import { AuthStore } from "@/app/interfaces/Store";

export const authStates: AuthStore = {
  isAuthencating: true,
  user: {
    name: "",
    email: "",
    image: "",
    _id: "",
  },
  userLibrary: [],
};
