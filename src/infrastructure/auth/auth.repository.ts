import axios from "axios";
import { AuthRepository } from "@/src/core/auth/domain/AuthRepository";
import { API_ENDPOINTS } from "@/src/constants/api";
import { AuthResponse, LogoutResponse } from "@/src/core/auth/type";

export class AuthApiRepository implements AuthRepository {
  async login(email: string, password: string): Promise<AuthResponse | null> {
    try {

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
          {
            email,
            password,
          }
        );
        if (!res.data) return null;

        return res.data;
      } catch (error) {
        console.error("Auth API login error:", error);
        return null;
      }
    
  }
  async logout(refreshToken: string): Promise<LogoutResponse | null> {
    try {

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.LOGOUT}`,
          {
            refreshToken
          }
        );
        if (!res.data) return null;

        return res.data;
      } catch (error) {
        console.error("Auth API logout error:", error);
        return null;
      }
    
  }
}
