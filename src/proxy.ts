import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") || "";
  const isRootSubdomain = host.includes("root");
  const url = `https://${host}`;
  const pathName = request.nextUrl.pathname;
  const authRoutes = ["/login", "/signup", "/"];

  if(isRootSubdomain && pathName.includes("/signup")) {
    return NextResponse.redirect(new URL('/login', url));
  }

  const isLoggedIn = await getUserSession(request, response);
  if (authRoutes.includes(pathName)) {
    if (isLoggedIn) {
      const redirectResponse = NextResponse.redirect(new URL('/dashboard', url));
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, {
          path: cookie.path || '/',
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
          sameSite: cookie.sameSite,
          maxAge: cookie.maxAge,
        });
      });
      return redirectResponse;
    }
  } else if (!isLoggedIn && pathName.includes("/dashboard")) {
    return NextResponse.redirect(new URL('/login', url));
  } else {
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};

