export interface UserData {
  id: string;
  username: string;
  email: string;
  discord: string;
  avatar_url: string;
  createdAt: Date;
}

export interface CreateUserData {
  id: string;
  username: string;
  email: string;
  discord: string;
  avatar_url: string;
}

export interface AuthUserRepository {
  create: (data: CreateUserData) => Promise<UserData>;
  findById: (id: string) => Promise<UserData | null>;
}
