import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Earth3D() {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        containerRef.current.appendChild(renderer.domElement)

        // Earth Group
        const earthGroup = new THREE.Group()
        scene.add(earthGroup)

        const loader = new THREE.TextureLoader()

        // Earth
        const geometry = new THREE.SphereGeometry(5, 64, 64)
        const material = new THREE.MeshPhongMaterial({
            map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
            bumpMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
            bumpScale: 0.05,
            specularMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
            specular: new THREE.Color('grey'),
            color: 0xaaaaaa
        })

        const earth = new THREE.Mesh(geometry, material)
        earthGroup.add(earth)

        // Atmosphere
        const atmosGeometry = new THREE.SphereGeometry(5.2, 64, 64)
        const atmosMaterial = new THREE.MeshLambertMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        })
        const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial)
        scene.add(atmosphere)

        // Satellite Group
        const satGroup = new THREE.Group()
        scene.add(satGroup)

        const satelliteModel = new THREE.Group()

        // Satellite Bus
        const busGeo = new THREE.BoxGeometry(0.6, 0.6, 1.2)
        const busMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 })
        const bus = new THREE.Mesh(busGeo, busMat)
        satelliteModel.add(bus)

        // Solar Panels
        const panelGeo = new THREE.BoxGeometry(3, 0.1, 0.8)
        const panelMat = new THREE.MeshStandardMaterial({
            color: 0x222222, metalness: 0.5, roughness: 0.1,
            emissive: 0x111144, emissiveIntensity: 0.2
        })

        const leftPanel = new THREE.Mesh(panelGeo, panelMat)
        leftPanel.position.set(-1.8, 0, 0)
        const rightPanel = new THREE.Mesh(panelGeo, panelMat)
        rightPanel.position.set(1.8, 0, 0)
        satelliteModel.add(leftPanel, rightPanel)

        satelliteModel.scale.set(0.5, 0.5, 0.5)
        satelliteModel.position.set(7, 0, 0)
        satelliteModel.rotation.y = Math.PI / 2
        satGroup.add(satelliteModel)

        // Orbit Ring
        const ringGeo = new THREE.RingGeometry(6.9, 7.0, 64)
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.05, transparent: true, side: THREE.DoubleSide })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 2
        satGroup.add(ring)

        satGroup.rotation.z = Math.PI / 4
        satGroup.rotation.x = Math.PI / 3

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 1.5)
        pointLight.position.set(20, 10, 20)
        scene.add(pointLight)

        const dirLight = new THREE.DirectionalLight(0xffffff, 1)
        dirLight.position.set(5, 3, 5)
        scene.add(dirLight)

        // Stars
        const starGeo = new THREE.BufferGeometry()
        const starCount = 2000
        const posArray = new Float32Array(starCount * 3)
        for (let i = 0; i < starCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
        const starMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.8 })
        const stars = new THREE.Points(starGeo, starMat)
        scene.add(stars)

        camera.position.z = 13

        // Mouse interaction
        let mouseX = 0, mouseY = 0
        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1
        }
        document.addEventListener('mousemove', handleMouseMove)

        // Animation
        const animate = () => {
            requestAnimationFrame(animate)

            earth.rotation.y += 0.002
            atmosphere.rotation.y += 0.002
            satGroup.rotation.y -= 0.005
            satelliteModel.rotation.x += 0.002

            earthGroup.rotation.x += (mouseY * 0.1 - earthGroup.rotation.x) * 0.05
            earthGroup.rotation.y += (mouseX * 0.1 - earthGroup.rotation.y) * 0.05

            renderer.render(scene, camera)
        }
        animate()

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            containerRef.current?.removeChild(renderer.domElement)
            renderer.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #02040a 100%)'
            }}
        />
    )
}

export default Earth3D
