'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

const formSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  cidade: z.string().min(1, 'Selecione uma cidade'),
  tipo_acomodacao: z.string().min(1, 'Selecione um tipo de acomodação'),
  data_chegada: z.string().min(1, 'Selecione uma data'),
  duracao: z.string().min(1, 'Selecione a duração'),
})

type FormData = z.infer<typeof formSchema>

export default function FormularioPage() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)

      // Enviar para o Supabase
      const { error } = await supabase
        .from('leads_acomodacoes')
        .insert([
          {
            ...data,
            data_envio: new Date().toISOString(),
          },
        ])

      if (error) throw error

      // Limpar formulário
      reset()

      // Mostrar mensagem de sucesso
      toast.success(
        'Obrigado por enviar sua solicitação! Em breve nossa equipe entrará em contato com opções exclusivas de acomodação.'
      )
    } catch (error: any) {
      toast.error('Erro ao enviar formulário: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-center mb-8">
          Solicite sua Acomodação
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Preencha o formulário abaixo e nossa equipe entrará em contato com as
          melhores opções para você.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nome Completo</label>
            <input
              type="text"
              {...register('nome')}
              className="w-full p-2 border rounded-md"
              disabled={loading}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">E-mail</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border rounded-md"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp</label>
            <input
              type="tel"
              {...register('whatsapp')}
              className="w-full p-2 border rounded-md"
              disabled={loading}
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Cidade onde deseja estudar
            </label>
            <select
              {...register('cidade')}
              className="w-full p-2 border rounded-md"
              disabled={loading}
            >
              <option value="">Selecione uma cidade</option>
              <option value="dublin">Dublin</option>
              <option value="cork">Cork</option>
              <option value="galway">Galway</option>
            </select>
            {errors.cidade && (
              <p className="text-red-500 text-sm mt-1">{errors.cidade.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tipo de Acomodação
            </label>
            <select
              {...register('tipo_acomodacao')}
              className="w-full p-2 border rounded-md"
              disabled={loading}
            >
              <option value="">Selecione o tipo</option>
              <option value="apartamento">Apartamento Compartilhado</option>
              <option value="studio">Studio Individual</option>
              <option value="residencia">Residência Estudantil</option>
              <option value="homestay">Casa de Família (Homestay)</option>
            </select>
            {errors.tipo_acomodacao && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tipo_acomodacao.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Data aproximada de chegada
            </label>
            <input
              type="date"
              {...register('data_chegada')}
              className="w-full p-2 border rounded-md"
              disabled={loading}
            />
            {errors.data_chegada && (
              <p className="text-red-500 text-sm mt-1">
                {errors.data_chegada.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Duração da estadia
            </label>
            <select
              {...register('duracao')}
              className="w-full p-2 border rounded-md"
              disabled={loading}
            >
              <option value="">Selecione a duração</option>
              <option value="1-3">1-3 meses</option>
              <option value="4-6">4-6 meses</option>
              <option value="7-12">7-12 meses</option>
              <option value="12+">Mais de 12 meses</option>
            </select>
            {errors.duracao && (
              <p className="text-red-500 text-sm mt-1">{errors.duracao.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-premium-graphite text-white py-3 rounded-md font-medium hover:bg-premium-graphite/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Solicitação'}
          </button>
        </form>
      </div>
    </div>
  )
} 