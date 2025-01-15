import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import date from '../api/users.json'

const CountTime = () => {
    const targetDate = date.targetDate
    const [t] = useTranslation('global')
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const navigate = useNavigate()
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()
            const target = new Date(targetDate)
            const difference = target - now

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                navigate('/newyear')
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
                const minutes = Math.floor((difference / (1000 * 60)) % 60)
                const seconds = Math.floor((difference / 1000) % 60)

                setTimeLeft({ days, hours, minutes, seconds })
            }
        }
        const timer = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(timer)
    }, [targetDate, navigate])
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="p-8 rounded-3xl border-4 border-white bg-white/30 backdrop-blur-md shadow-2xl hover:scale-105 transition-transform duration-500 ease-in-out">
                <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-4">Countdown</h1>
                <p className="text-3xl font-semibold text-white drop-shadow-lg">
                    {timeLeft.days} {t('time.days')}, {timeLeft.hours} {t('time.hours')}, {timeLeft.minutes} {t('time.minutes')}, {timeLeft.seconds} {t('time.seconds')}
                </p>
            </div>
        </div>

    )
}

export default CountTime