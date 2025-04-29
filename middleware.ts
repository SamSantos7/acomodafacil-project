
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/cadastro')
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
  const isClientPage = req.nextUrl.pathname.startsWith('/cliente')

  if (isAuthPage) {
    if (session) {
      // Redirecionar usuário logado para área apropriada
      if (session.user.user_metadata.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      return NextResponse.redirect(new URL('/cliente', req.url))
    }
    return res
  }

  if (!session) {
    if (isAdminPage || isClientPage) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return res
  }

  if (isAdminPage && session.user.user_metadata.role !== 'admin') {
    return NextResponse.redirect(new URL('/cliente', req.url))
  }

  if (isClientPage && session.user.user_metadata.role !== 'client') {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*', '/login', '/cadastro'],
}
