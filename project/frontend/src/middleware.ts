import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { nextUrl: url, cookies } = request
    const token = cookies.get('refreshtoken')?.value
    const { pathname } = url

    if (pathname === '/') {
        url.pathname = token ? '/home' : '/login'
        return NextResponse.redirect(url)
    }

  if (!token && pathname !== '/login' && pathname !== '/signup') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (token && (pathname === '/login' || pathname === '/signup')) {
    url.pathname = '/home'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
    matcher: [
    '/', 
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
}