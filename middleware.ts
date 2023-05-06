import { NextRequest, NextResponse } from "next/server";

const userPages = ["/my-posts"];

const adminPages = ["/all-users"];

export default function middleware(req: NextRequest) {
  const token = req.cookies
    .get("auth-cookie")
    ?.value.split(":")[2]
    .split(",")[0];

  const url = req.nextUrl.clone();
  const activePath = req.nextUrl.pathname;

  if (userPages.find((p) => p === activePath)) {
    if (token !== `"${"User"}"`) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (adminPages.find((p) => p === activePath)) {
    if (token !== `"${"Admin"}"`) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}
