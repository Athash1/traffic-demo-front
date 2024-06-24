export interface Auth {
  id: string;
  username: string;
  name: string;
}

export interface AuthState {
  token: string | null;
  userInfo: Auth | null;
  role: string | null;
}