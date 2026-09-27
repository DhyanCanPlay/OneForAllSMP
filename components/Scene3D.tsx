'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function FloatingBlock({
  position,
  color,
  scale = 1,
  speed = 1,
  rotationAxis = [0, 1, 0],
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
  rotationAxis?: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const initialY = position[1]

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    meshRef.current.rotation.x += 0.002 * rotationAxis[0]
    meshRef.current.rotation.y += 0.003 * rotationAxis[1]
    meshRef.current.position.y = initialY + Math.sin(t * 0.5) * 0.3
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function GrassBlock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.25
    meshRef.current.rotation.y = t * 0.2
  })

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.501, 0]} castShadow>
        <boxGeometry args={[1.01, 0.1, 1.01]} />
        <meshStandardMaterial color="#5D8C2E" roughness={0.6} emissive="#5D8C2E" emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}

function DiamondBlock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.3
    meshRef.current.rotation.y = t * 0.25
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.35
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#1ABC9C"
        roughness={0.15}
        metalness={0.6}
        emissive="#1ABC9C"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function DiamondOre({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.15
    groupRef.current.position.y = position[1] + Math.sin(t * 0.45) * 0.28
  })

  const spots = useMemo(() => [
    [0.2, 0.3, 0.501],
    [-0.2, -0.2, 0.501],
    [0.3, -0.1, 0.501],
    [-0.1, 0.2, -0.501],
    [0.25, -0.3, -0.501],
  ], [])

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#7A7A7A" roughness={0.9} />
      </mesh>
      {spots.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial
            color="#4AF5E7"
            emissive="#4AF5E7"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function EnchantmentBlock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.4
    meshRef.current.rotation.y = t * 0.35
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#9B59B6"
        roughness={0.2}
        metalness={0.4}
        emissive="#9B59B6"
        emissiveIntensity={0.4}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function NetherBlock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.z = Math.sin(t * 0.35) * 0.2
    meshRef.current.rotation.y = t * 0.2
    meshRef.current.position.y = position[1] + Math.sin(t * 0.55) * 0.32
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#C0392B"
        roughness={0.7}
        emissive="#E74C3C"
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

function BedrockBlock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.1
    meshRef.current.position.y = position[1] + Math.sin(t * 0.3) * 0.2
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2C3E50" roughness={0.95} metalness={0.1} />
    </mesh>
  )
}

function Particles() {
  const count = 60
  const meshRef = useRef<THREE.InstancedMesh>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const dummy = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1] + Math.sin(t * 0.3 + i) * 0.5
      const z = positions[i * 3 + 2]
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(0.02 + Math.sin(t + i * 0.5) * 0.01)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#2ECC71" transparent opacity={0.6} />
    </instancedMesh>
  )
}

function SceneContent() {
  const { viewport } = useThree()

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow color="#ffffff" />
      <pointLight position={[-3, 3, 2]} intensity={0.8} color="#1ABC9C" />
      <pointLight position={[3, -2, 3]} intensity={0.6} color="#9B59B6" />

      <GrassBlock position={[-4, 1.5, -2]} scale={1.2} />
      <DiamondOre position={[4.5, 0.5, -3]} scale={1.1} />
      <DiamondBlock position={[-3, -1, 1]} scale={0.9} />
      <EnchantmentBlock position={[3.5, 2, -1]} scale={0.85} />
      <NetherBlock position={[-2, 2.5, -4]} scale={1} />
      <BedrockBlock position={[2, -1.5, 2]} scale={0.95} />

      <FloatingBlock position={[-5.5, 0, -3]} color="#5D8C2E" scale={0.7} speed={0.8} />
      <FloatingBlock position={[5, 1.5, -2]} color="#E67E22" scale={0.65} speed={1.1} />
      <FloatingBlock position={[-1, -2, 3]} color="#3498DB" scale={0.6} speed={0.9} />
      <FloatingBlock position={[6, -1, 0]} color="#1ABC9C" scale={0.55} speed={1.2} />
      <FloatingBlock position={[-6, -0.5, 1]} color="#E74C3C" scale={0.5} speed={1} />

      <Particles />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
