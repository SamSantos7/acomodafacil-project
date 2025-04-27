import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const sendLeadNotification = async (lead: any) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AcomodaFácil <noreply@acomodafacil.com>',
      to: ['admin@acomodafacil.com'],
      subject: 'Nova Solicitação de Acomodação',
      html: `
        <h1>Nova Solicitação de Acomodação</h1>
        <p><strong>Nome:</strong> ${lead.nome}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>WhatsApp:</strong> ${lead.whatsapp}</p>
        <p><strong>Cidade:</strong> ${lead.cidade}</p>
        <p><strong>Tipo de Acomodação:</strong> ${lead.tipo_acomodacao}</p>
        <p><strong>Data de Chegada:</strong> ${lead.data_chegada}</p>
        <p><strong>Duração:</strong> ${lead.duracao}</p>
      `,
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error }
  }
}

export const sendLeadConfirmation = async (lead: any) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AcomodaFácil <noreply@acomodafacil.com>',
      to: [lead.email],
      subject: 'Recebemos sua solicitação - AcomodaFácil',
      html: `
        <h1>Olá ${lead.nome}!</h1>
        <p>Recebemos sua solicitação de acomodação e agradecemos seu interesse!</p>
        <p>Nossa equipe está analisando suas preferências e em breve entraremos em contato com opções personalizadas para você.</p>
        <p>Detalhes da sua solicitação:</p>
        <ul>
          <li>Cidade: ${lead.cidade}</li>
          <li>Tipo de Acomodação: ${lead.tipo_acomodacao}</li>
          <li>Data de Chegada: ${lead.data_chegada}</li>
          <li>Duração: ${lead.duracao}</li>
        </ul>
        <p>Se tiver alguma dúvida, não hesite em nos contatar.</p>
        <p>Atenciosamente,<br>Equipe AcomodaFácil</p>
      `,
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error }
  }
} 