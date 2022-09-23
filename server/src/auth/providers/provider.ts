export interface UserInfos {
  id: string;
  username: string;
  email: string;
  discord: string;
  avatarUrl: string;
}

export interface Provider {
  getToken: (code: string) => Promise<string>;
  getUserInfos: (token: string) => Promise<UserInfos>;
}
