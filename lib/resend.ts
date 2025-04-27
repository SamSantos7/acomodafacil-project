
import { Resend } from 'resend'
import type { Lead, Reservation } from './types'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const sendLeadNotification = async (lead: Lead) => {
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

export const sendReservationConfirmation = async (reservation: Reservation) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AcomodaFácil <noreply@acomodafacil.com>',
      to: [reservation.email],
      subject: 'Confirmação de Reserva - AcomodaFácil',
      html: `
        <h1>Reserva Confirmada!</h1>
        <p>Sua reserva foi confirmada com sucesso.</p>
        <p><strong>Check-in:</strong> ${reservation.data_checkin}</p>
        <p><strong>Check-out:</strong> ${reservation.data_checkout}</p>
        <p>Entraremos em contato em breve com mais informações.</p>
      `,
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error }
  }
}

export const sendReservationCancellation = async (reservation: Reservation) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AcomodaFácil <noreply@acomodafacil.com>',
      to: [reservation.email],
      subject: 'Cancelamento de Reserva - AcomodaFácil',
      html: `
        <h1>Reserva Cancelada</h1>
        <p>Sua reserva foi cancelada conforme solicitado.</p>
        <p>Se precisar de ajuda para fazer uma nova reserva, entre em contato conosco.</p>
      `,
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error }
  }
}
