"use client"

import { useState } from "react"
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("leads")
  const [showAddPartnerDialog, setShowAddPartnerDialog] = useState(false)
  const [showResponseDialog, setShowResponseDialog] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)

  // Dados de exemplo
  const leads = [
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "+55 11 98765-4321",
      destination: "Dublin",
      status: "Novo",
      date: "15/05/2023",
      message: "Olá, estou interessado em acomodações em Dublin para um período de 6 meses a partir de setembro.",
    },
    {
      id: 2,
      name: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      phone: "+55 21 98765-4321",
      destination: "Cork",
      status: "Respondido",
      date: "12/05/2023",
      message: "Preciso de uma acomodação em Cork para 3 meses, a partir de agosto. Prefiro algo próximo ao centro.",
    },
    {
      id: 3,
      name: "Pedro Santos",
      email: "pedro.santos@email.com",
      phone: "+55 31 98765-4321",
      destination: "Galway",
      status: "Convertido",
      date: "10/05/2023",
      message: "Estou procurando uma casa de família em Galway para melhorar meu inglês. Período de 4 meses.",
    },
    {
      id: 4,
      name: "Ana Souza",
      email: "ana.souza@email.com",
      phone: "+55 41 98765-4321",
      destination: "Dublin",
      status: "Novo",
      date: "08/05/2023",
      message: "Gostaria de informações sobre residências estudantis em Dublin para o próximo semestre.",
    },
    {
      id: 5,
      name: "Lucas Ferreira",
      email: "lucas.ferreira@email.com",
      phone: "+55 51 98765-4321",
      destination: "Limerick",
      status: "Respondido",
      date: "05/05/2023",
      message: "Preciso de um apartamento compartilhado em Limerick para mim e mais um amigo. Orçamento de até €800.",
    },
  ]

  const partners = [
    {
      id: 1,
      name: "Dublin Student Housing",
      email: "contact@dublinhousing.ie",
      phone: "+353 1 234 5678",
      type: "Residência Estudantil",
      locations: ["Dublin"],
      status: "Ativo",
    },
    {
      id: 2,
      name: "Cork Homestays",
      email: "info@corkhomestays.ie",
      phone: "+353 21 234 5678",
      type: "Casa de Família",
      locations: ["Cork"],
      status: "Ativo",
    },
    {
      id: 3,
      name: "Galway Apartments",
      email: "rentals@galwayapts.ie",
      phone: "+353 91 234 5678",
      type: "Apartamentos",
      locations: ["Galway"],
      status: "Ativo",
    },
    {
      id: 4,
      name: "Ireland Student Living",
      email: "info@irelandstudent.ie",
      phone: "+353 1 987 6543",
      type: "Residência Estudantil",
      locations: ["Dublin", "Cork", "Galway"],
      status: "Ativo",
    },
    {
      id: 5,
      name: "Emerald Accommodations",
      email: "contact@emeraldacc.ie",
      phone: "+353 1 567 8901",
      type: "Apartamentos",
      locations: ["Dublin", "Limerick"],
      status: "Inativo",
    },
  ]

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
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Destino</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.destination}</TableCell>
                            <TableCell>{getStatusBadge(lead.status)}</TableCell>
                            <TableCell>{lead.date}</TableCell>
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
                                <CardTitle className="text-lg">{lead.name}</CardTitle>
                                <CardDescription>
                                  {lead.email} • {lead.phone} • {lead.date}
                                </CardDescription>
                              </div>
                              <Badge className="bg-blue-500">{lead.destination}</Badge>
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
                    De: {selectedLead.name} ({selectedLead.email})
                  </p>
                  <p>Destino: {selectedLead.destination}</p>
                  <p>Data: {selectedLead.date}</p>
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
                  defaultValue={`Olá ${selectedLead.name},

Obrigado por entrar em contato com a AcomodaFácil!

Recebemos sua solicitação sobre acomodações em ${selectedLead.destination} e temos excelentes opções que podem atender às suas necessidades.

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
