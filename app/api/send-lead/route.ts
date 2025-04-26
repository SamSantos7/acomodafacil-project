import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createRouteHandlerClient({ cookies })

    // Validar dados
    if (!body.nome || !body.email || !body.whatsapp || !body.cidade || !body.tipo_acomodacao || !body.data_chegada || !body.duracao) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Inserir no Supabase
    const { error } = await supabase.from('leads_acomodacoes').insert([
      {
        ...body,
        data_envio: new Date().toISOString(),
      },
    ])

    if (error) throw error

    // TODO: Enviar e-mail automático
    // TODO: Preparar webhook para WhatsApp

    return NextResponse.json(
      {
        message:
          'Obrigado por enviar sua solicitação! Em breve nossa equipe entrará em contato com opções exclusivas de acomodação.',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Erro ao processar lead:', error)
    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação' },
      { status: 500 }
    )
  }
} 