
export interface User {
  id: string
  email: string
  nome_completo: string
  data_nascimento: string
  instituicao_ensino: string
  data_viagem: string
  cidade: string
  estado: string
  telefone: string
  role: 'admin' | 'client'
}

export interface Reservation {
  id: string
  user_id: string
  accommodation_id: string
  status: 'pendente' | 'confirmada' | 'cancelada'
  data_checkin: string
  data_checkout: string
  numero_pessoas: number
  observacoes?: string
  created_at: string
}

export interface Document {
  id: string
  user_id: string
  reservation_id?: string
  nome: string
  tipo: 'upload' | 'download'
  url: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  tipo: 'mensagem' | 'status' | 'documento'
  lida: boolean
  titulo: string
  mensagem: string
  created_at: string
}
