import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Permite acesso direto a todas as rotas
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*', '/login', '/cadastro']
}