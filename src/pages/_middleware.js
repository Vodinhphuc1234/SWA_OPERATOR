import { NextResponse } from "next/server";

export default function middleware(req) {
  if (!req.url.includes("/login")) {
    const token = req.cookies.token;
    if (token) {
      return NextResponse.next();
    }
    return NextResponse.redirect("http://127.0.0.1:3001/login");
  } else if (req.cookies.token) {
    return NextResponse.redirect("http://127.0.0.1:3001/localhost:3000");
  }
  return NextResponse.next();
}
