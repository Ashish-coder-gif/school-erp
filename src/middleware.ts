import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route needs authentication
  const protectedRoutes = ["/admin", "/teacher", "/student", "/parent"]
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const session = await auth()

    if (!session) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Optionally: Check role-based access
    const userRole = session.user?.role?.toLowerCase() || ""
    const routeRole = pathname.split("/")[1].toLowerCase()

    if (userRole !== routeRole) {
      // Redirect to user's own dashboard if accessing different role's dashboard
      return NextResponse.redirect(new URL(`/${userRole}`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*", "/parent/:path*"],
}
