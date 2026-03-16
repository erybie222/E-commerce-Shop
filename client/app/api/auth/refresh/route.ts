import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    const currentAccessToken = cookieStore.get("access_token")?.value;

    if (!refreshToken) {
      if (currentAccessToken) {
        return NextResponse.json({ access: currentAccessToken });
      }

      return NextResponse.json(
        { detail: "Missing refresh token" },
        { status: 401 },
      );
    }

    const apiBaseUrl = process.env.API_BASE_URL;

    const refreshResponse = await fetch(`${apiBaseUrl}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
      cache: "no-store",
    });

    if (!refreshResponse.ok) {
      if (currentAccessToken) {
        return NextResponse.json({ access: currentAccessToken });
      }

      const details = await refreshResponse.text().catch(() => "");
      return NextResponse.json(
        { detail: details || "Token refresh failed" },
        { status: 401 },
      );
    }

    const data = await refreshResponse.json();
    const access = data?.access;

    if (!access) {
      return NextResponse.json(
        { detail: "Refresh response missing access token" },
        { status: 401 },
      );
    }

    const isProduction = process.env.NODE_ENV === "production";
    cookieStore.set("access_token", access, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json({ access });
  } catch {
    return NextResponse.json(
      { detail: "Auth refresh route failed" },
      { status: 401 },
    );
  }
}
