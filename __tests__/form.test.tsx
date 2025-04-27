import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FormularioPage from '@/app/formulario/page'
import { vi } from 'vitest'

// Mock dos serviços
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      insert: () => ({
        error: null,
      }),
    }),
  },
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('FormularioPage', () => {
  it('renderiza o formulário corretamente', () => {
    render(<FormularioPage />)
    
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/whatsapp/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tipo de acomodação/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data.*chegada/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/duração/i)).toBeInTheDocument()
  })

  it('exibe erro quando campos obrigatórios estão vazios', async () => {
    render(<FormularioPage />)
    
    const submitButton = screen.getByText(/enviar solicitação/i)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/nome.*obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/email.*obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/whatsapp.*obrigatório/i)).toBeInTheDocument()
    })
  })

  it('envia formulário com sucesso', async () => {
    render(<FormularioPage />)
    
    // Preencher formulário
    fireEvent.change(screen.getByLabelText(/nome completo/i), {
      target: { value: 'João Silva' },
    })
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'joao@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/whatsapp/i), {
      target: { value: '5511999999999' },
    })
    fireEvent.change(screen.getByLabelText(/cidade/i), {
      target: { value: 'dublin' },
    })
    fireEvent.change(screen.getByLabelText(/tipo de acomodação/i), {
      target: { value: 'apartamento' },
    })
    fireEvent.change(screen.getByLabelText(/data.*chegada/i), {
      target: { value: '2024-06-01' },
    })
    fireEvent.change(screen.getByLabelText(/duração/i), {
      target: { value: '4-6' },
    })

    // Enviar formulário
    const submitButton = screen.getByText(/enviar solicitação/i)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/enviando/i)).toBeInTheDocument()
    })
  })
}) 