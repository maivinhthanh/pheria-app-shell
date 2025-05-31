export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
}

export interface LogoutResponse {
  message: string; 
}
