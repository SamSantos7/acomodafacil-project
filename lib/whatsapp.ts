export const sendWhatsAppMessage = async (to: string, message: string) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
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
            name: 'lead_confirmation',
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

export const sendLeadWhatsAppNotification = async (lead: any) => {
  const message = `Olá ${lead.nome}! 👋

Recebemos sua solicitação de acomodação na AcomodaFácil.

📍 Cidade: ${lead.cidade}
🏠 Tipo: ${lead.tipo_acomodacao}
📅 Chegada: ${lead.data_chegada}
⏳ Duração: ${lead.duracao}

Em breve nossa equipe entrará em contato com opções personalizadas para você!

Atenciosamente,
Equipe AcomodaFácil`

  return sendWhatsAppMessage(lead.whatsapp, message)
} 