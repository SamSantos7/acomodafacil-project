
import { Reservation, Document } from './types'

export const sendWhatsAppMessage = async (to: string, message: string) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/5521970286372/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: 'notification',
            language: {
              code: 'pt_BR',
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: message,
                  },
                ],
              },
            ],
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Erro ao enviar mensagem')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erro ao enviar mensagem WhatsApp:', error)
    return { success: false, error }
  }
}

export const sendReservationStatusNotification = async (reservation: Reservation, clientPhone: string) => {
  const statusMessages = {
    pendente: 'Sua reserva está pendente de confirmação.',
    confirmada: 'Sua reserva foi confirmada! 🎉 Veja os próximos passos.',
    cancelada: 'Sua reserva foi cancelada.',
    processando: 'Sua reserva está em processamento.',
    documentos_pendentes: 'Documentos pendentes para sua reserva.',
    pagamento_confirmado: 'Pagamento confirmado! Prosseguindo com sua reserva.'
  }

  const message = `AcomodaFácil - Atualização de Reserva

${statusMessages[reservation.status]}

ID da Reserva: ${reservation.id}
Check-in: ${new Date(reservation.data_checkin).toLocaleDateString()}
Check-out: ${new Date(reservation.data_checkout).toLocaleDateString()}

Para mais detalhes, acesse sua área do cliente.`

  return sendWhatsAppMessage(clientPhone, message)
}

export const sendDocumentNotification = async (document: Document, clientPhone: string) => {
  const message = `AcomodaFácil - Novo Documento

Um novo documento foi ${document.tipo === 'upload' ? 'enviado' : 'recebido'}: ${document.nome}

Acesse sua área do cliente para visualizar.`

  return sendWhatsAppMessage(clientPhone, message)
}

export const sendNewMessageNotification = async (clientPhone: string) => {
  const message = `AcomodaFácil - Nova Mensagem

Você recebeu uma nova mensagem em sua caixa de entrada.
Acesse sua área do cliente para visualizar.`

  return sendWhatsAppMessage(clientPhone, message)
}
