// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      // If token exists, user is authenticated
      return !!token;
    },
  },
});

// Protect all routes except /login and /api/auth
export const config = {
  matcher: ["/editor/:path*", "/library/:path*"], // add more protected routes here
};
