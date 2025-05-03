
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/cadastro')
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
  const isClientPage = req.nextUrl.pathname.startsWith('/cliente')

  if (!session) {
    if (isAdminPage || isClientPage) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return res
  }

  // Check user role from metadata
  const userRole = session.user.user_metadata.role || 'client'

  if (isAuthPage) {
    return NextResponse.redirect(new URL(userRole === 'admin' ? '/admin' : '/cliente', req.url))
  }

  if (isAdminPage && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/cliente', req.url))
  }

  if (isClientPage && !['client', 'admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*', '/login', '/cadastro']
}
