import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/profile') || 
                           request.nextUrl.pathname.startsWith('/checkout');

  if (isProtectedRoute && !token) {

    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/checkout/:path*'],
};