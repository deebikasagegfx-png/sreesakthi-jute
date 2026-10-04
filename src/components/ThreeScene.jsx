import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30)
    camera.position.set(2.1, 1.7, 3.2)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight('#fff4dd', '#715638', 2.2))
    const keyLight = new THREE.DirectionalLight('#fff4e0', 2.8)
    keyLight.position.set(2, 3, 4)
    scene.add(keyLight)

    const spool = new THREE.Group()
    scene.add(spool)
    const jute = new THREE.MeshStandardMaterial({ color: '#bb9562', roughness: 0.94 })
    const edge = new THREE.MeshStandardMaterial({ color: '#816542', roughness: 0.86 })
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.49, 0.49, 0.65, 48), jute)
    spool.add(core)

    const flangeGeometry = new THREE.CylinderGeometry(0.62, 0.62, 0.075, 48)
    const topFlange = new THREE.Mesh(flangeGeometry, edge)
    const bottomFlange = new THREE.Mesh(flangeGeometry, edge)
    topFlange.position.y = 0.36
    bottomFlange.position.y = -0.36
    spool.add(topFlange, bottomFlange)

    const threadGeometry = new THREE.TorusGeometry(0.49, 0.009, 5, 48)
    for (let index = 0; index < 19; index += 1) {
      const thread = new THREE.Mesh(threadGeometry, index % 4 === 0 ? edge : jute)
      thread.position.y = -0.3 + index * 0.033
      spool.add(thread)
    }

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect()
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.render(scene, camera)
    })
    resizeObserver.observe(host)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId
    const render = () => {
      if (!reducedMotion) spool.rotation.y += 0.003
      renderer.render(scene, camera)
      if (!reducedMotion) frameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      core.geometry.dispose()
      flangeGeometry.dispose()
      threadGeometry.dispose()
      jute.dispose()
      edge.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="three-scene" ref={hostRef} role="img" aria-label="A slowly turning spool of natural jute fibre" />
}