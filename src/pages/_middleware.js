import { NextResponse } from "next/server";

export default function middleware(req) {
  if (!req.url.includes("/login")) {
    const token = req.cookies.token;
    if (token) {
      console.log("pass");
      return NextResponse.next();
    }
    console.log("not pass");
    return NextResponse.redirect("https://swa-operator.vercel.app/login");
  } else if (req.cookies.token) {
    console.log("pass");
    return NextResponse.redirect("https://swa-operator.vercel.app/");
  }
  console.log("login");
  return NextResponse.next();
}
