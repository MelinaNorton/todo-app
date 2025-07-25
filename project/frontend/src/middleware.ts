import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('refreshtoken')?.value;
    if (!token) {
        if (!['/login', '/signup'].includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }
    else if (token) {
        if (request.nextUrl.pathname == "/login") {
            return NextResponse.redirect(new URL('/home', request.url));
        }
        else {
            return NextResponse.next();
        }
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}