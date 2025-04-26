import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Se tentar acessar área admin sem estar logado
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth', req.url))
    }
  }

  // Se tentar acessar login já estando logado
  if (req.nextUrl.pathname === '/auth') {
    if (session) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return res
}

// Ensure the middleware is only called for relevant paths
export const config = {
  matcher: ['/admin/:path*', '/auth'],
} 