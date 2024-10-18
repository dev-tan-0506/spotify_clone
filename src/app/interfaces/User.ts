export interface UserLoginGoogleInfo {
  name: string;
  email: string;
  image: string;
  _id: string;
}

export interface AuthenticationInfo {
  access_token: string;
  user: UserLoginGoogleInfo;
}
