import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protected paths that require login
        const protectedPaths = ["/admin", "/account", "/cart", "/wishlist"];
        const isProtected = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

        if (isProtected) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/cart/:path*", "/wishlist/:path*"],
};
