// src/types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      // các trường mặc định khác bạn có thể thêm nếu cần
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    id?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
