import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let cookie = request.cookies.get("jwt");
  let scuerUrl =
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/sing-up";
  console.log(scuerUrl);

  if (scuerUrl) {
    if (cookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/login", "/sing-up"],
};
