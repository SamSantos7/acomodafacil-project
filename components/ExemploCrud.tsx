import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

// Tipo para nossos dados
interface Tarefa {
  id: number
  titulo: string
  concluida: boolean
  created_at: string
}

export function ExemploCrud() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [novaTarefa, setNovaTarefa] = useState('')
  const [loading, setLoading] = useState(false)

  // Carregar tarefas ao iniciar
  useEffect(() => {
    carregarTarefas()
  }, [])

  // Buscar tarefas do Supabase
  const carregarTarefas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tarefas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) setTarefas(data)
    } catch (error: any) {
      toast.error('Erro ao carregar tarefas: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Adicionar nova tarefa
  const adicionarTarefa = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!novaTarefa.trim()) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('tarefas')
        .insert([{ titulo: novaTarefa.trim(), concluida: false }])

      if (error) throw error
      
      toast.success('Tarefa adicionada!')
      setNovaTarefa('')
      carregarTarefas()
    } catch (error: any) {
      toast.error('Erro ao adicionar tarefa: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Alternar status da tarefa
  const alternarTarefa = async (id: number, concluida: boolean) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('tarefas')
        .update({ concluida: !concluida })
        .eq('id', id)

      if (error) throw error
      
      toast.success('Tarefa atualizada!')
      carregarTarefas()
    } catch (error: any) {
      toast.error('Erro ao atualizar tarefa: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Excluir tarefa
  const excluirTarefa = async (id: number) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('tarefas')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast.success('Tarefa excluída!')
      carregarTarefas()
    } catch (error: any) {
      toast.error('Erro ao excluir tarefa: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[600px] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Lista de Tarefas</CardTitle>
        <CardDescription>Exemplo de CRUD com Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={adicionarTarefa} className="flex gap-2 mb-4">
          <Input
            placeholder="Nova tarefa..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            Adicionar
          </Button>
        </form>

        <div className="space-y-2">
          {tarefas.map((tarefa) => (
            <div
              key={tarefa.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span
                style={{
                  textDecoration: tarefa.concluida ? 'line-through' : 'none',
                }}
              >
                {tarefa.titulo}
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() => alternarTarefa(tarefa.id, tarefa.concluida)}
                  variant="outline"
                  size="sm"
                  disabled={loading}
                >
                  {tarefa.concluida ? 'Desfazer' : 'Concluir'}
                </Button>
                <Button
                  onClick={() => excluirTarefa(tarefa.id)}
                  variant="destructive"
                  size="sm"
                  disabled={loading}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 