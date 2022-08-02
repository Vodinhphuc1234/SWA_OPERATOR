import { NextResponse } from "next/server";

export default function middleware(req) {
  const redirect = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3001" : "https://swa-operator.vercel.app";
  if (!req.url.includes("/login")) {
    const token = req.cookies.token;
    if (token) {
      console.log("pass");
      return NextResponse.next();
    }
    console.log("not pass");
    return NextResponse.redirect(redirect+"/login");
  } else if (req.cookies.token) {
    console.log("pass");
    return NextResponse.redirect(redirect);
  }
  console.log("login");
  return NextResponse.next();
}
