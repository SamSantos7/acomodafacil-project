export default function Loading() {
  return (
    <div className="container px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-graphite-300">Carregando informações da acomodação...</p>
      </div>
    </div>
  )
}
