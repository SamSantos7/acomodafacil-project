
export interface Lead {
  id?: string
  nome: string
  email: string
  whatsapp: string
  cidade: string
  tipo_acomodacao: string
  data_chegada: string
  duracao: string
  data_envio?: string
}

export interface Document {
  id?: string
  user_id: string
  nome: string
  tipo: string
  url: string
  data_upload?: string
}

export interface Reservation {
  id?: string
  user_id: string
  acomodacao_id: string
  data_checkin: string
  data_checkout: string
  status: 'pendente' | 'confirmada' | 'cancelada'
  data_solicitacao?: string
}
