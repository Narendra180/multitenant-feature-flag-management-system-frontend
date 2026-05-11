import type { NextRequest, NextResponse } from "next/server";

const getUserSession = async (request: NextRequest, response: NextResponse) => {
  try {

    const host = request.headers.get("host");
    const backendUrl = `https://${host}/api/v1/auth`;

    const subdomain = (host?.split('.').slice(0, -2).join('.')) || "";

    const allCookies = request.cookies.toString();

    const meResponse = await fetch(`${backendUrl}/me`, {
      headers: {
        "Cookie": allCookies,
        "x-tenant-slug": subdomain
      }
    });

    const meResponseData = await meResponse.json();
    if (!(meResponseData.success)) {
      const refreshTokenResponse = await fetch(`${backendUrl}/refreshtoken`, {
        headers: {
          "Cookie": allCookies,
          "x-tenant-slug": subdomain
        }
      });
      const refreshTokenResponseData = await refreshTokenResponse.json();
      if(!(refreshTokenResponseData.success)) {
        return null;
      }
      const cookies = refreshTokenResponse.headers.getSetCookie();
      cookies.forEach((cookieString) => {
        const strArr = cookieString.split(";");
        const [key, value] = strArr[0].split("=");
        response.cookies.set(
          key,
          value,
          {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 60 * 15
          }
        );
      });

      return true;
    }
    return Boolean(meResponseData);
  } catch (err: any) {
    return null;
  }
}

export {
  getUserSession
};

