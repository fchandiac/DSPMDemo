import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'supersecretkey',
  });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Permitir acceso basado en roles
  const path = req.nextUrl.pathname;
  
  // Rutas protegidas para admin
  if (path.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  // Rutas protegidas para operadores
  if (path.startsWith('/operator') && token.role !== 'operator' && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  // Rutas protegidas para usuarios normales
  if (path.startsWith('/user') && token.role !== 'user' && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/operator/:path*',
    '/user/:path*'
  ],
};
