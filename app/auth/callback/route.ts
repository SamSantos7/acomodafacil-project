
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) throw error

      // Determine redirect based on user role
      const role = user?.user_metadata?.role || 'client'
      const redirectPath = role === 'admin' ? '/admin' : '/cliente'
      
      return NextResponse.redirect(new URL(redirectPath, requestUrl.origin))
    }

    throw new Error('No code provided')
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=auth_callback_failed', request.url))
  }
}
