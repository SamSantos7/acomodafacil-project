"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  User,
  FileText,
  LogOut,
  Menu,
  X,
  CalendarDays,
  Bell
} from "lucide-react"

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
      } else {
        setUser(user)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const menuItems = [
    {
      href: "/cliente/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      href: "/cliente/perfil",
      label: "Meu Perfil",
      icon: User
    },
    {
      href: "/cliente/documentos",
      label: "Documentos",
      icon: FileText
    },
    {
      href: "/cliente/reservas",
      label: "Reservas",
      icon: CalendarDays
    },
    {
      href: "/cliente/notificacoes",
      label: "Notificações",
      icon: Bell
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        <h1 className="text-xl font-bold text-graphite-400">
          Área do Cliente
        </h1>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed md:static md:translate-x-0
          z-20 bg-white h-[calc(100vh-4rem)] md:h-screen w-64 
          transition-transform duration-200 ease-in-out
          border-r
        `}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-graphite-400">
              Área do Cliente
            </h2>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}

            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}