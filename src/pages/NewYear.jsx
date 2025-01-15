import { useEffect, useRef, useState } from 'react'
import "tailwindcss/tailwind.css"
import ModalSettingFireWorks from '../components/ModalSettingFireWorks'
import { CiSettings } from "react-icons/ci"
import BackButton from '../components/BackButton'
import { IoMdClose } from "react-icons/io"
import music from '../assets/audio/nhac.mp3'
import year from '../api/users.json'

const NewYear = () => {
    const newyear = year.new_year
    const audioRef = useRef(null)
    const trailsCanvasRef = useRef(null)
    const mainCanvasRef = useRef(null)
    const [showSettings, setShowSettings] = useState(false)
    const [settings, setSettings] = useState({
        shellType: 'Random', // Loại vỏ
        shellSize: 5, // Kích thước vỏ
        quality: 'Normal', // Chất lượng
        skyLighting: 'Normal', // Độ sáng bầu trời
        scaleFactor: 1, // Tỉ lệ (nhìn xa hoặc gần pháo hoa)
        speed: 0.6, // Tốc độ bay của pháo
        autoLaunch: false, // Tự động bắn
        finaleMode: false, // Chế độ bắn hàng loạt
        hideControls: false, // Ẩn điều khiển
        fullscreen: false, // Toàn màn hình
        experimental: false, // Thử nghiệm
    })

    const updateSettings = (updatedSettings) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...updatedSettings,
        }))
    }

    const toggleSettings = () => setShowSettings(!showSettings)

    // Toàn màn hình
    useEffect(() => {
        if (settings.fullscreen) {
            // Chỉ yêu cầu chế độ toàn màn hình nếu chưa ở chế độ này
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen()
            }
        } else {
            // Thoát chế độ toàn màn hình nếu đang ở chế độ này
            if (document.fullscreenElement) {
                document.exitFullscreen()
            }
        }
    }, [settings.fullscreen])

    useEffect(() => {
        // Firework logic
        const GRAVITY = settings.scaleFactor * 0.9
        const particles = []
        const rockets = []

        const trailsCanvas = trailsCanvasRef.current
        const mainCanvas = mainCanvasRef.current
        const trailsCtx = trailsCanvas.getContext('2d')
        const mainCtx = mainCanvas.getContext('2d')

        function resizeCanvas() {
            const width = window.innerWidth
            const height = window.innerHeight
            trailsCanvas.width = width
            trailsCanvas.height = height
            mainCanvas.width = width
            mainCanvas.height = height
        }

        function createParticle(x, y, color) {
            const angle = Math.random() * Math.PI * 2
            const speed = Math.random() * (settings.shellSize || 5) + 2
            return {
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color,
            }
        }

        function createRocket(x, y, targetY, color) {
            return {
                x,
                y,
                vy: -Math.random() * (settings.shellSize || 5) - 6,
                targetY,
                color,
                exploded: false,
            }
        }

        function drawParticle(particle) {
            mainCtx.globalAlpha = particle.alpha
            mainCtx.beginPath()
            mainCtx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
            mainCtx.fillStyle = particle.color
            mainCtx.fill()
        }

        function drawRocket(rocket) {
            mainCtx.globalAlpha = 1
            mainCtx.beginPath()
            mainCtx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2)
            mainCtx.fillStyle = rocket.color
            mainCtx.fill()
        }

        function updateParticles() {
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i]
                p.x += p.vx * settings.speed
                p.y += p.vy * settings.speed
                p.vy += GRAVITY * 0.02 * settings.speed
                p.alpha -= 0.02
                if (p.alpha <= 0) {
                    particles.splice(i, 1)
                }
            }
        }

        function updateRockets() {
            for (let i = rockets.length - 1; i >= 0; i--) {
                const r = rockets[i]
                r.y += r.vy * settings.speed
                if (r.y <= r.targetY && !r.exploded) {
                    r.exploded = true
                    for (let j = 0; j < 50; j++) {
                        particles.push(createParticle(r.x, r.y, r.color))
                    }
                    rockets.splice(i, 1)
                }
            }
        }

        function launchFirework(x, y) {
            const targetY = y || Math.random() * mainCanvas.height / 2
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`
            rockets.push(createRocket(x, mainCanvas.height, targetY, color))
        }

        if (settings.autoLaunch) {
            const interval = setInterval(() => launchFirework(), 1000 / settings.speed)
            return () => clearInterval(interval)
        }

        function animate() {
            trailsCtx.clearRect(0, 0, trailsCanvas.width, trailsCanvas.height)
            mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
            updateRockets()
            updateParticles()
            rockets.forEach(drawRocket)
            particles.forEach(drawParticle)
            requestAnimationFrame(animate)
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        mainCanvas.addEventListener('click', (event) => {
            const rect = mainCanvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            launchFirework(x, y)
        })

        if (settings.autoLaunch) {
            const autoLaunchInterval = setInterval(() => {
                launchFirework(
                    Math.random() * mainCanvas.width,
                    Math.random() * (mainCanvas.height / 2)
                )
            }, 1000 / (settings.quality === 'High' ? 2 : 1))
            return () => clearInterval(autoLaunchInterval)
        }
        animate()
        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [settings])

    return (
        <div className="relative h-screen w-screen bg-black text-white font-sans overflow-hidden">
            <canvas ref={trailsCanvasRef} className="absolute top-0 left-0 w-full h-full" />
            <canvas ref={mainCanvasRef} className="absolute top-0 left-0 w-full h-full" />

            <div className="flex items-center justify-center h-full">
                <div className="text-center flex items-center justify-center space-y-5 flex-col pointer-events-none select-none">
                    <p className="text-9xl font-bold text-gradient-animation font-jersey">Happy New Year</p>
                    <span className="text-7xl mt-4 text-red-500 animate-pulse-scale font-jersey">{newyear}</span>
                </div>
            </div>

            <span
                onClick={toggleSettings}
                className="absolute top-4 right-4 hover:text-white text-gray-700 cursor-pointer"
            >
                <CiSettings size={30} />
            </span>
            <div className='absolute left-4 top-4'>
                <BackButton to='/' variant='default' icon={<IoMdClose size={30} />} />
            </div>
            {showSettings && (
                <ModalSettingFireWorks
                    isOpen={showSettings}
                    onClose={toggleSettings}
                    settings={settings}
                    updateSettings={updateSettings}
                    audioRef={audioRef}
                />
            )}
            <audio ref={audioRef} loop autoPlay>
                <source src={music} type="audio/mpeg" />
            </audio>
        </div>
    )
}

export default NewYear