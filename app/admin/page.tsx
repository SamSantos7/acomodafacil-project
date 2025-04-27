"use client"

import type React from "react"

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
  Upload,
  Bed,
  Eye,
  EyeOff,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("leads")
  const [showAddPartnerDialog, setShowAddPartnerDialog] = useState(false)
  const [showResponseDialog, setShowResponseDialog] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [showAddAccommodationDialog, setShowAddAccommodationDialog] = useState(false)
  const [showEditAccommodationDialog, setShowEditAccommodationDialog] = useState(false)
  const [selectedAccommodation, setSelectedAccommodation] = useState<any>(null)

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    address: "",
    price: "",
    features: "",
    description: "",
    included: "",
    notIncluded: "",
    active: true,
  })

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

  // Estado para armazenar as acomodações
  const [accommodations, setAccommodations] = useState([
    {
      id: 1,
      name: "Residência Estudantil Central",
      type: "Residência Estudantil",
      location: "Dublin",
      address: "123 O'Connell Street, Dublin 1",
      price: 195,
      active: true,
      features: ["Quarto individual", "Banheiro privativo", "Wi-Fi", "Cozinha compartilhada"],
      included: ["Internet de alta velocidade", "Limpeza semanal", "Utensílios de cozinha", "Contas inclusas"],
      notIncluded: ["Refeições", "Serviço de lavanderia", "Toalhas e roupas de cama"],
      description: "Residência moderna no centro de Dublin, próxima às principais escolas de inglês e universidades.",
      images: ["/images/student-residence.png", "/images/apartment-living.png"],
      rating: 4.8,
      reviews: 24,
      slug: "residencia-estudantil-central",
    },
    {
      id: 2,
      name: "Apartamento Compartilhado - Temple Bar",
      type: "Apartamento Compartilhado",
      location: "Dublin",
      address: "45 Temple Bar, Dublin 2",
      price: 175,
      active: true,
      features: ["Quarto mobiliado", "Cozinha equipada", "Sala comum", "Internet fibra"],
      included: ["Internet", "TV a cabo", "Mobília completa", "Utensílios domésticos"],
      notIncluded: ["Contas de luz e gás", "Limpeza", "Alimentação"],
      description: "Apartamento no coração de Dublin, compartilhado com outros estudantes internacionais.",
      images: ["/images/shared-apartment.png"],
      rating: 4.5,
      reviews: 18,
      slug: "apartamento-compartilhado-temple-bar",
    },
    {
      id: 3,
      name: "Casa de Família em Galway",
      type: "Casa de Família",
      location: "Galway",
      address: "78 Salthill Road, Galway",
      price: 210,
      active: true,
      features: ["Quarto privativo", "Café da manhã e jantar", "Ambiente familiar", "Wi-Fi"],
      included: ["Duas refeições diárias", "Lavanderia semanal", "Internet", "Limpeza do quarto"],
      notIncluded: ["Almoço", "Transporte", "Material de estudo"],
      description: "Família acolhedora em Galway, com experiência em receber estudantes internacionais.",
      images: ["/images/homestay.png"],
      rating: 4.9,
      reviews: 32,
      slug: "casa-de-familia-em-galway",
    },
    {
      id: 4,
      name: "Estúdio Individual - Cork",
      type: "Estúdio Individual",
      location: "Cork",
      address: "22 Washington Street, Cork",
      price: 250,
      active: false,
      features: ["Totalmente mobiliado", "Cozinha própria", "Banheiro privativo", "Internet"],
      included: ["Mobília completa", "Internet", "TV", "Utensílios de cozinha"],
      notIncluded: ["Contas de luz, água e gás", "Limpeza", "Alimentação"],
      description: "Estúdio moderno e independente no centro de Cork, ideal para quem busca privacidade.",
      images: ["/images/apartment-living.png"],
      rating: 4.6,
      reviews: 15,
      slug: "estudio-individual-cork",
    },
    {
      id: 5,
      name: "Residência Universitária - Limerick",
      type: "Residência Estudantil",
      location: "Limerick",
      address: "University of Limerick, Castletroy",
      price: 185,
      active: true,
      features: ["Quarto individual", "Banheiro compartilhado", "Áreas comuns", "Academia"],
      included: ["Internet", "Água, luz e gás", "Acesso à academia", "Segurança 24h"],
      notIncluded: ["Alimentação", "Limpeza do quarto", "Lavanderia"],
      description: "Residência dentro do campus da Universidade de Limerick, com todas as facilidades universitárias.",
      images: ["/images/student-residence.png"],
      rating: 4.7,
      reviews: 21,
      slug: "residencia-universitaria-limerick",
    },
  ])

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

  const handleAddAccommodation = () => {
    // Validar campos obrigatórios
    if (!formData.name || !formData.type || !formData.location || !formData.price) {
      toast({
        title: "Erro ao adicionar acomodação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Criar slug a partir do nome
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Criar nova acomodação
    const newAccommodation = {
      id: accommodations.length + 1,
      name: formData.name,
      type: formData.type,
      location: formData.location,
      address: formData.address,
      price: Number(formData.price),
      active: formData.active,
      features: formData.features.split(",").map((item) => item.trim()),
      included: formData.included.split(",").map((item) => item.trim()),
      notIncluded: formData.notIncluded.split(",").map((item) => item.trim()),
      description: formData.description,
      images: ["/images/student-residence.png"], // Imagem padrão
      rating: 0,
      reviews: 0,
      slug: slug,
    }

    // Adicionar à lista
    setAccommodations([...accommodations, newAccommodation])

    // Limpar formulário e fechar diálogo
    resetForm()
    setShowAddAccommodationDialog(false)

    toast({
      title: "Acomodação adicionada",
      description: "A acomodação foi adicionada com sucesso.",
    })
  }

  const handleEditAccommodation = () => {
    if (!selectedAccommodation) return

    // Validar campos obrigatórios
    if (!formData.name || !formData.type || !formData.location || !formData.price) {
      toast({
        title: "Erro ao editar acomodação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Atualizar acomodação
    const updatedAccommodations = accommodations.map((acc) => {
      if (acc.id === selectedAccommodation.id) {
        return {
          ...acc,
          name: formData.name,
          type: formData.type,
          location: formData.location,
          address: formData.address,
          price: Number(formData.price),
          active: formData.active,
          features: formData.features.split(",").map((item) => item.trim()),
          included: formData.included.split(",").map((item) => item.trim()),
          notIncluded: formData.notIncluded.split(",").map((item) => item.trim()),
          description: formData.description,
        }
      }
      return acc
    })

    setAccommodations(updatedAccommodations)
    setShowEditAccommodationDialog(false)

    toast({
      title: "Acomodação atualizada",
      description: "A acomodação foi atualizada com sucesso.",
    })
  }

  const handleDeleteAccommodation = (id: number) => {
    const updatedAccommodations = accommodations.filter((acc) => acc.id !== id)
    setAccommodations(updatedAccommodations)

    toast({
      title: "Acomodação excluída",
      description: "A acomodação foi excluída com sucesso.",
    })
  }

  const handleToggleActive = (id: number) => {
    const updatedAccommodations = accommodations.map((acc) => {
      if (acc.id === id) {
        return {
          ...acc,
          active: !acc.active,
        }
      }
      return acc
    })

    setAccommodations(updatedAccommodations)

    toast({
      title: "Status atualizado",
      description: "O status da acomodação foi atualizado com sucesso.",
    })
  }

  const openEditDialog = (accommodation: any) => {
    setSelectedAccommodation(accommodation)
    setFormData({
      name: accommodation.name,
      type: accommodation.type,
      location: accommodation.location,
      address: accommodation.address,
      price: accommodation.price.toString(),
      features: accommodation.features.join(", "),
      included: accommodation.included.join(", "),
      notIncluded: accommodation.notIncluded.join(", "),
      description: accommodation.description,
      active: accommodation.active,
    })
    setShowEditAccommodationDialog(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      location: "",
      address: "",
      price: "",
      features: "",
      included: "",
      notIncluded: "",
      description: "",
      active: true,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      active: checked,
    }))
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
            <Button
              variant={activeTab === "accommodations" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("accommodations")}
            >
              <Bed className="mr-2 h-5 w-5" />
              Acomodações
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="messages">Solicitações</TabsTrigger>
              <TabsTrigger value="partners">Parceiros</TabsTrigger>
              <TabsTrigger value="accommodations">Acomodações</TabsTrigger>
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

          {activeTab === "accommodations" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-graphite-400">Gerenciar Acomodações</h1>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Buscar acomodações..." className="pl-8 w-full md:w-[250px]" />
                  </div>
                  <Dialog open={showAddAccommodationDialog} onOpenChange={setShowAddAccommodationDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Acomodação
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Adicionar Nova Acomodação</DialogTitle>
                        <DialogDescription>
                          Preencha os dados da nova acomodação para adicioná-la à plataforma.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome da Acomodação</Label>
                            <Input
                              id="name"
                              placeholder="Ex: Residência Estudantil Central"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Tipo de Acomodação</Label>
                            <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                              <SelectTrigger id="type">
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Residência Estudantil">Residência Estudantil</SelectItem>
                                <SelectItem value="Apartamento Compartilhado">Apartamento Compartilhado</SelectItem>
                                <SelectItem value="Casa de Família">Casa de Família</SelectItem>
                                <SelectItem value="Estúdio Individual">Estúdio Individual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Cidade</Label>
                            <Select
                              value={formData.location}
                              onValueChange={(value) => handleSelectChange("location", value)}
                            >
                              <SelectTrigger id="location">
                                <SelectValue placeholder="Selecione a cidade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Dublin">Dublin</SelectItem>
                                <SelectItem value="Cork">Cork</SelectItem>
                                <SelectItem value="Galway">Galway</SelectItem>
                                <SelectItem value="Limerick">Limerick</SelectItem>
                                <SelectItem value="Waterford">Waterford</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Endereço</Label>
                            <Input
                              id="address"
                              placeholder="Endereço completo"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Preço Semanal (€)</Label>
                            <Input
                              id="price"
                              type="number"
                              placeholder="Ex: 195"
                              value={formData.price}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="active">Status</Label>
                            <div className="flex items-center space-x-2 pt-2">
                              <Checkbox id="active" checked={formData.active} onCheckedChange={handleCheckboxChange} />
                              <label
                                htmlFor="active"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Ativa (visível no site)
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="features">Características (separadas por vírgula)</Label>
                          <Input
                            id="features"
                            placeholder="Ex: Quarto individual, Banheiro privativo, Wi-Fi"
                            value={formData.features}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="included">O que está incluso (separado por vírgula)</Label>
                          <Input
                            id="included"
                            placeholder="Ex: Internet, Limpeza semanal, Utensílios de cozinha"
                            value={formData.included}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notIncluded">O que não está incluso (separado por vírgula)</Label>
                          <Input
                            id="notIncluded"
                            placeholder="Ex: Refeições, Serviço de lavanderia, Toalhas"
                            value={formData.notIncluded}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea
                            id="description"
                            placeholder="Descreva a acomodação em detalhes"
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Imagens</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Arraste imagens ou clique para fazer upload</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG ou WEBP (máx. 5MB cada)</p>
                            <Button variant="outline" size="sm" className="mt-4">
                              Selecionar Arquivos
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            resetForm()
                            setShowAddAccommodationDialog(false)
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleAddAccommodation}>Adicionar Acomodação</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Acomodações Cadastradas</CardTitle>
                  <CardDescription>Gerencie as acomodações disponíveis na plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Localização</TableHead>
                          <TableHead>Preço (€/semana)</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {accommodations.map((accommodation) => (
                          <TableRow key={accommodation.id}>
                            <TableCell className="font-medium">{accommodation.name}</TableCell>
                            <TableCell>{accommodation.type}</TableCell>
                            <TableCell>{accommodation.location}</TableCell>
                            <TableCell>€{accommodation.price}/semana</TableCell>
                            <TableCell>
                              {accommodation.active ? (
                                <Badge className="bg-green-500">Ativa</Badge>
                              ) : (
                                <Badge className="bg-gray-500">Inativa</Badge>
                              )}
                            </TableCell>
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
                                  <DropdownMenuItem onClick={() => openEditDialog(accommodation)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar Acomodação
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleActive(accommodation.id)}>
                                    {accommodation.active ? (
                                      <>
                                        <EyeOff className="mr-2 h-4 w-4" />
                                        Desativar
                                      </>
                                    ) : (
                                      <>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Ativar
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteAccommodation(accommodation.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir Acomodação
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

      {/* Edit Accommodation Dialog */}
      <Dialog open={showEditAccommodationDialog} onOpenChange={setShowEditAccommodationDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Acomodação</DialogTitle>
            <DialogDescription>Atualize os dados da acomodação.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Acomodação</Label>
                <Input
                  id="name"
                  placeholder="Ex: Residência Estudantil Central"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Acomodação</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residência Estudantil">Residência Estudantil</SelectItem>
                    <SelectItem value="Apartamento Compartilhado">Apartamento Compartilhado</SelectItem>
                    <SelectItem value="Casa de Família">Casa de Família</SelectItem>
                    <SelectItem value="Estúdio Individual">Estúdio Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Cidade</Label>
                <Select value={formData.location} onValueChange={(value) => handleSelectChange("location", value)}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dublin">Dublin</SelectItem>
                    <SelectItem value="Cork">Cork</SelectItem>
                    <SelectItem value="Galway">Galway</SelectItem>
                    <SelectItem value="Limerick">Limerick</SelectItem>
                    <SelectItem value="Waterford">Waterford</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  placeholder="Endereço completo"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço Semanal (€)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Ex: 195"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="active">Status</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="active" checked={formData.active} onCheckedChange={handleCheckboxChange} />
                  <label
                    htmlFor="active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ativa (visível no site)
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Características (separadas por vírgula)</Label>
              <Input
                id="features"
                placeholder="Ex: Quarto individual, Banheiro privativo, Wi-Fi"
                value={formData.features}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="included">O que está incluso (separado por vírgula)</Label>
              <Input
                id="included"
                placeholder="Ex: Internet, Limpeza semanal, Utensílios de cozinha"
                value={formData.included}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notIncluded">O que não está incluso (separado por vírgula)</Label>
              <Input
                id="notIncluded"
                placeholder="Ex: Refeições, Serviço de lavanderia, Toalhas"
                value={formData.notIncluded}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva a acomodação em detalhes"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Imagens</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Arraste imagens ou clique para fazer upload</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG ou WEBP (máx. 5MB cada)</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Selecionar Arquivos
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditAccommodationDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditAccommodation}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
