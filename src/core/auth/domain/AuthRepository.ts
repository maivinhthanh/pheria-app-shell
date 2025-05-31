import { AuthResponse, LogoutResponse } from "../type";

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthResponse | null>; // returns token,
  logout(refreshToken: string): Promise<LogoutResponse | null>;
}
