import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isApiRoute = req.nextUrl.pathname.startsWith('/api')

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Protect admin routes
    if (isAdminPage && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Allow API routes to pass through
    if (isApiRoute) {
      return NextResponse.next()
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always allow public pages
        if (
          req.nextUrl.pathname === '/' ||
          req.nextUrl.pathname.startsWith('/blog') ||
          req.nextUrl.pathname.startsWith('/qa') ||
          req.nextUrl.pathname.startsWith('/auth')
        ) {
          return true
        }
        // Require token for all other pages
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    // Only match private pages for auth
    '/dashboard/:path*',
    '/members/:path*',
    '/classes/:path*',
    '/trainers/:path*',
    '/admin/:path*',
    // Auth and public pages are always allowed
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 