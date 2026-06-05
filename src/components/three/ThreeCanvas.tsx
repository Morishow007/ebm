import { Suspense, lazy } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { ThreeFallback } from './ThreeFallback'

// r3f-perf is imported lazily so it is excluded from the production bundle.
const Perf = import.meta.env.DEV
  ? lazy(() => import('r3f-perf').then((m) => ({ default: m.Perf })))
  : null

interface ThreeCanvasProps {
  children?: React.ReactNode
  className?: string
}

export function ThreeCanvas({ children, className }: ThreeCanvasProps) {
  return (
    <div className={className ?? 'h-full w-full'}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, preserveDrawingBuffer: false }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={1}
            maxDistance={20}
          />
          {children}
        </Suspense>

        {Perf && (
          <Suspense fallback={null}>
            <Perf position="top-left" />
          </Suspense>
        )}
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0">
        <ThreeFallback />
      </div>
    </div>
  )
}
