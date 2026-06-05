import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ModelViewerProps {
  modelPath: string
}

export function ModelViewer({ modelPath }: ModelViewerProps) {
  const { scene } = useGLTF(modelPath)
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  // Center and normalize model bounds
  useEffect(() => {
    if (!groupRef.current) return

    const box = new THREE.Box3().setFromObject(groupRef.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2 / maxDim

    groupRef.current.position.sub(center.multiplyScalar(scale))
    groupRef.current.scale.setScalar(scale)

    // Pull camera back to fit model
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.set(0, 0, 3)
      camera.updateProjectionMatrix()
    }
  }, [scene, camera])

  // Release GPU memory on unmount
  useEffect(() => {
    return () => {
      useGLTF.clear(modelPath)
    }
  }, [modelPath])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}
