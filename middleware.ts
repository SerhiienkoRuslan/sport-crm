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
        // Allow auth pages without token
        if (req.nextUrl.pathname.startsWith('/auth')) {
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
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 