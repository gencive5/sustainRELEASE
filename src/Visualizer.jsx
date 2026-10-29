import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import wobbleVertexShader from './shaders/blur/vertex.glsl'
import wobbleFragmentShader from './shaders/blur/fragment.glsl'
import { useTexture, Environment } from '@react-three/drei'
import { useIsMobile } from './IsMobile.jsx'

export default function Experience() {
  const { scene } = useThree()

  // mobile detection
  const isMobile = useIsMobile()

  // video
  const imageTexture = useTexture('blue.jpg')

  // set as scene background
  useEffect(() => {
    if (imageTexture) {
      scene.background = imageTexture
    }
    return () => {
      if (scene.background === imageTexture) {
        scene.background = null
      }
    }
  }, [imageTexture, scene])


  // Material parameters
  const DEFAULT_TRANSMISSION = 1.0
  const DEFAULT_THICKNESS = 0.95
  const DEFAULT_ROUGHNESS = 0.19
  const DEFAULT_COLOR = '#feffff'

  const POSITION_FREQUENCY = 0.5
  const UTIME_FREQUENCY = 0.31
  const USTRENGTH = 0.38
  const DEFAULT_IOR = 2

  // uniforms
  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uPositionFrequency: new THREE.Uniform(POSITION_FREQUENCY),
      uTimeFrequency: new THREE.Uniform(UTIME_FREQUENCY),
      uStrength: new THREE.Uniform(USTRENGTH),
    }),
    []
  )

  // materials
  const material = useMemo(() => {
    return new CustomShaderMaterial({
      baseMaterial: THREE.MeshPhysicalMaterial,
      vertexShader: wobbleVertexShader,
      fragmentShader: wobbleFragmentShader,
      uniforms: uniforms,

      // MeshPhysicalMaterial properties
      roughness: DEFAULT_ROUGHNESS,
      transmission: DEFAULT_TRANSMISSION,
      thickness: DEFAULT_THICKNESS,
      color: DEFAULT_COLOR,
      ior: DEFAULT_IOR,
      transparent: true,
      side: THREE.DoubleSide,
      metalness: 0.0,
    })
  }, [uniforms])

  // const depthMaterial = useMemo(() => {
  //   return new CustomShaderMaterial({
  //     baseMaterial: THREE.MeshDepthMaterial,
  //     vertexShader: wobbleVertexShader,
  //     uniforms: uniforms,
  //     depthPacking: THREE.RGBADepthPacking,
  //   })
  // }, [uniforms])

  // BLOB
  const geometry = useMemo(() => {
    const subdivisions = isMobile ? 15 : 50
    const size = isMobile ? 3 : 5
    let geo = new THREE.IcosahedronGeometry(size, subdivisions)
    geo = mergeVertices(geo)
    geo.computeTangents()
    return geo
  }, [isMobile])

  // Animation
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
  })

  const position = isMobile ? [0, 0, 0] : [0, 2, 0]
  const scale = isMobile ? [1.2, 2, 1] : [2.2, 1, 1.7]



  return (
    <>
      <mesh
        geometry={geometry}
        material={material}
        // customDepthMaterial={depthMaterial}
        position={position}
        scale={scale}
      />
      {/* <Suspense fallback={null}>
        <Environment files="./lilienstein_1k.hdr" background={false} />
      </Suspense> */}
    </>
  )
}