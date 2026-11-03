import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if (
    url.startsWith("/_next") ||
    url.startsWith("/api") ||
    url.match(/\.(ico|png|jpg|jpeg|svg|css|js|html)$/)
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  let sessionId = request.cookies.get("session_id")?.value;
  if (!sessionId) {
    sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    response.cookies.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
  }

  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgentStr = request.headers.get("user-agent") || "-";
  const referer = request.headers.get("referer") || "-";
  const geoCountry =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    "unknown";

  const { browser } = userAgent(request);
  const logData = {
    event_type: "page_request",
    timestamp: new Date().toISOString(),
    ip,
    session_id: sessionId,
    url,
    method: request.method,
    user_agent: userAgentStr,
    browser: browser.name || "unknown",
    referer,
    geo_country: geoCountry,
    cookie_enabled: !!request.cookies.get("session_id"),
  };

  console.log("\n[TRAFFIC_LOG]\n", JSON.stringify(logData, null, 2), "\n");

  return response;
}