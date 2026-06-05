export function ThreeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-600 border-t-amber-400" />
        <p className="mt-4 text-sm text-zinc-400">Carregando modelo 3D...</p>
      </div>
    </div>
  )
}
