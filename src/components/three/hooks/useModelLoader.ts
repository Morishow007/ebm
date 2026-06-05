import { useState } from 'react'
import { useGLTF } from '@react-three/drei'

interface ModelLoaderState {
  isLoading: boolean
  error: Error | null
}

export function useModelLoader(modelPath: string): ModelLoaderState {
  const [error, setError] = useState<Error | null>(null)

  try {
    useGLTF.preload(modelPath)
  } catch (err) {
    setError(err instanceof Error ? err : new Error('Falha ao carregar modelo'))
  }

  return {
    isLoading: false,
    error,
  }
}
