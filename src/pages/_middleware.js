import { NextResponse } from "next/server";

export default function middleware(req) {
  const redirect =
    process.env.NODE_ENV == "development"
      ? "http://127.0.0.1:3001"
      : "https://swa-operator.vercel.app";
  if (!req.nextUrl.pathname.startsWith("/login")) {
    const token = req.cookies.token;
    if (token) {
      console.log("pass");
      return NextResponse.next();
    }
    console.log("not pass");
    return NextResponse.rewrite(new URL(redirect + "/login", req.url));
  } else if (req.cookies.token) {
    console.log("pass");
    return NextResponse.rewrite(new URL(redirect, req.url));
  }
  console.log("login");
  return NextResponse.next();
}
