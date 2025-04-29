import { Resend } from 'resend'
import type { Lead, Reservation } from './types'

const resend = new Resend(process.env.RESEND_API_KEY)

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

export async function sendReservationEmail(to: string, name: string, status: string, reservationDetails?: any) {
  await resend.emails.send({
    from: 'AcomodaFácil <no-reply@acomodafacil.com>',
    to,
    subject: `Atualização da sua reserva - ${status}`,
    html: `
      <h1>Olá ${name},</h1>
      <p>O status da sua reserva foi atualizado para: <strong>${status}</strong></p>
      ${reservationDetails ? `
        <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
          <p><strong>Detalhes da Reserva:</strong></p>
          <p>Data de Check-in: ${new Date(reservationDetails.data_checkin).toLocaleDateString()}</p>
          <p>Data de Check-out: ${new Date(reservationDetails.data_checkout).toLocaleDateString()}</p>
          <p>Destino: ${reservationDetails.cidade}</p>
          <p>Acomodação: ${reservationDetails.tipo_acomodacao}</p>
        </div>
      ` : ''}
      <p>Acesse sua área do cliente para mais detalhes.</p>
      <p><a href="https://acomodafacil.com/cliente/dashboard" style="background: #0EA5E9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Acessar Dashboard</a></p>
    `
  })
}

export async function sendDocumentEmail(to: string, name: string, documentName: string) {
  await resend.emails.send({
    from: 'AcomodaFácil <no-reply@acomodafacil.com>',
    to,
    subject: 'Novo documento disponível',
    html: `
      <h1>Olá ${name},</h1>
      <p>Um novo documento foi adicionado: <strong>${documentName}</strong></p>
      <p>Acesse sua área do cliente para visualizar.</p>
    `
  })
}

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'AcomodaFácil <no-reply@acomodafacil.com>',
    to,
    subject: 'Bem-vindo à AcomodaFácil',
    html: `
      <h1>Olá ${name},</h1>
      <p>Seja bem-vindo à AcomodaFácil!</p>
      <p>Estamos felizes em ter você como cliente. Acesse sua área restrita para gerenciar suas reservas e documentos.</p>
    `
  })
}