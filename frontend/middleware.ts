import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard", "/parties", "/politicians", "/elections", "/results", "/analytics", "/admin"];

export function middleware(request: NextRequest) {
  const shouldProtect = protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix));
  if (!shouldProtect) return NextResponse.next();
  if (!request.cookies.get("access_token")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
