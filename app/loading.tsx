
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  )
}
