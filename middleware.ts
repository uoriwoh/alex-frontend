import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';

async function verifyJWT(token: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  try {
    const { payload } = await jose.jwtVerify(token, secret, { algorithms: ["HS256"] })
    return payload.role
  } catch (error) {
    return false
  }
}

const userPages = ["/my-posts"];

const adminPages = ["/all-users"];

export default async function middleware(req: NextRequest) {
  const token = req?.cookies?.get('token')
  const isVerified = await verifyJWT(token?.value)

  const url = req.nextUrl.clone();
  const activePath = req.nextUrl.pathname;

  if (userPages.find((p) => p === activePath)) {
    if (isVerified !== "User") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (adminPages.find((p) => p === activePath)) {
    if (isVerified !== "Admin") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (activePath === "/") {
    if (isVerified === "Admin" || isVerified === "User") {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }
  }
}
