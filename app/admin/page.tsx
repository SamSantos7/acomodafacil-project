"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Users,
  MessageSquare,
  Building,
  Search,
  Filter,
  MoreHorizontal,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  PlusCircle,
  UserPlus,
  UserMinus,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Lead {
  id: number
  nome: string
  email: string
  whatsapp: string
  cidade: string
  tipo_acomodacao: string
  data_chegada: string
  duracao: string
  data_envio: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("leads")
  const [showAddPartnerDialog, setShowAddPartnerDialog] = useState(false)
  const [showResponseDialog, setShowResponseDialog] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarLeads()
  }, [])

  const carregarLeads = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('leads_acomodacoes')
        .select('*')
        .order('data_envio', { ascending: false })

      if (error) throw error
      if (data) setLeads(data)
    } catch (error: any) {
      console.error('Erro ao carregar leads:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatarData = (data: string) => {
    return format(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  const tiposAcomodacao = {
    apartamento: 'Apartamento Compartilhado',
    studio: 'Studio Individual',
    residencia: 'Residência Estudantil',
    homestay: 'Casa de Família',
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Novo":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
      case "Respondido":
        return <Badge className="bg-amber-500 hover:bg-amber-600">{status}</Badge>
      case "Convertido":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "Ativo":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "Inativo":
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleOpenResponseDialog = (lead: any) => {
    setSelectedLead(lead)
    setShowResponseDialog(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-graphite-400">Admin Dashboard</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-2">
            <Button
              variant={activeTab === "leads" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("leads")}
            >
              <Users className="mr-2 h-5 w-5" />
              Leads
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Solicitações
            </Button>
            <Button
              variant={activeTab === "partners" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("partners")}
            >
              <Building className="mr-2 h-5 w-5" />
              Parceiros
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden bg-white p-4 border-b">
          <h2 className="text-xl font-bold text-graphite-400">Admin Dashboard</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="messages">Solicitações</TabsTrigger>
              <TabsTrigger value="partners">Parceiros</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-graphite-400">Gerenciar Leads</h1>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Buscar leads..." className="pl-8 w-full md:w-[250px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Leads Recentes</CardTitle>
                  <CardDescription>Gerencie os leads que chegaram através do formulário de cotação.</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">Carregando leads...</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>WhatsApp</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Acomodação</TableHead>
                            <TableHead>Data Chegada</TableHead>
                            <TableHead>Duração</TableHead>
                            <TableHead>Data Envio</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leads.map((lead) => (
                            <TableRow key={lead.id}>
                              <TableCell className="font-medium">{lead.nome}</TableCell>
                              <TableCell>{lead.email}</TableCell>
                              <TableCell>{lead.whatsapp}</TableCell>
                              <TableCell>{lead.cidade}</TableCell>
                              <TableCell>{tiposAcomodacao[lead.tipo_acomodacao as keyof typeof tiposAcomodacao]}</TableCell>
                              <TableCell>{formatarData(lead.data_chegada)}</TableCell>
                              <TableCell>
                                {lead.duracao === '12+'
                                  ? 'Mais de 12 meses'
                                  : `${lead.duracao} meses`}
                              </TableCell>
                              <TableCell>{formatarData(lead.data_envio)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Abrir menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleOpenResponseDialog(lead)}>
                                      <MessageSquare className="mr-2 h-4 w-4" />
                                      Responder
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Editar Status
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Excluir
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-graphite-400">Responder Solicitações</h1>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Buscar solicitações..." className="pl-8 w-full md:w-[250px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Solicitações Pendentes</CardTitle>
                  <CardDescription>Responda às solicitações de cotação dos estudantes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {leads
                      .filter((lead) => lead.status === "Novo")
                      .map((lead) => (
                        <Card key={lead.id} className="overflow-hidden">
                          <CardHeader className="bg-gray-50 pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{lead.nome}</CardTitle>
                                <CardDescription>
                                  {lead.email} • {lead.whatsapp} • {formatarData(lead.data_envio)}
                                </CardDescription>
                              </div>
                              <Badge className="bg-blue-500">{lead.cidade}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-graphite-300 mb-4">{lead.message}</p>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <XCircle className="mr-2 h-4 w-4" />
                                Arquivar
                              </Button>
                              <Button size="sm" onClick={() => handleOpenResponseDialog(lead)}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Responder
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                    {leads.filter((lead) => lead.status === "Novo").length === 0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-medium text-graphite-400">Nenhuma solicitação pendente</h3>
                        <p className="mt-2 text-graphite-300">Todas as solicitações foram respondidas. Bom trabalho!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "partners" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-graphite-400">Gerenciar Parceiros</h1>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Buscar parceiros..." className="pl-8 w-full md:w-[250px]" />
                  </div>
                  <Dialog open={showAddPartnerDialog} onOpenChange={setShowAddPartnerDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Parceiro
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Parceiro</DialogTitle>
                        <DialogDescription>
                          Preencha os dados do novo parceiro para adicioná-lo à plataforma.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Nome
                          </Label>
                          <Input id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" type="email" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Telefone
                          </Label>
                          <Input id="phone" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="type" className="text-right">
                            Tipo
                          </Label>
                          <Input id="type" className="col-span-3" placeholder="Residência, Apartamento, etc." />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="locations" className="text-right">
                            Localizações
                          </Label>
                          <Input id="locations" className="col-span-3" placeholder="Dublin, Cork, etc." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddPartnerDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => setShowAddPartnerDialog(false)}>Adicionar Parceiro</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Parceiros Cadastrados</CardTitle>
                  <CardDescription>Gerencie os parceiros que oferecem acomodações na plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Localizações</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partners.map((partner) => (
                          <TableRow key={partner.id}>
                            <TableCell className="font-medium">{partner.name}</TableCell>
                            <TableCell>{partner.type}</TableCell>
                            <TableCell>{partner.locations.join(", ")}</TableCell>
                            <TableCell>{getStatusBadge(partner.status)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Abrir menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar Parceiro
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Ativar Parceiro
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <UserMinus className="mr-2 h-4 w-4" />
                                    Desativar Parceiro
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir Parceiro
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Response Dialog */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Responder Solicitação</DialogTitle>
            <DialogDescription>Envie uma resposta personalizada para o estudante.</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-4 py-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-graphite-400 mb-1">Mensagem Original:</h4>
                <p className="text-graphite-300">{selectedLead.message}</p>
                <div className="mt-2 text-sm text-graphite-300">
                  <p>
                    De: {selectedLead.nome} ({selectedLead.email})
                  </p>
                  <p>Destino: {selectedLead.cidade}</p>
                  <p>Data: {formatarData(selectedLead.data_envio)}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="response" className="mb-2 block">
                  Sua Resposta:
                </Label>
                <Textarea
                  id="response"
                  rows={8}
                  placeholder="Digite sua resposta aqui..."
                  defaultValue={`Olá ${selectedLead.nome},

Obrigado por entrar em contato com a AcomodaFácil!

Recebemos sua solicitação sobre acomodações em ${selectedLead.cidade} e temos excelentes opções que podem atender às suas necessidades.

Podemos agendar uma conversa para discutir mais detalhes sobre suas preferências e orçamento?

Atenciosamente,
Equipe AcomodaFácil`}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResponseDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowResponseDialog(false)}>Enviar Resposta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
