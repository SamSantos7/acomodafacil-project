
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { sendReservationStatusNotification, sendDocumentNotification, sendNewMessageNotification } from '@/lib/whatsapp'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createRouteHandlerClient({ cookies })
    
    const { type, data, phone } = body

    switch (type) {
      case 'reservation_status':
        await sendReservationStatusNotification(data, phone)
        break
      case 'document':
        await sendDocumentNotification(data, phone)
        break
      case 'message':
        await sendNewMessageNotification(phone)
        break
      default:
        throw new Error('Tipo de notificação inválido')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao enviar notificação:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar notificação' },
      { status: 500 }
    )
  }
}
