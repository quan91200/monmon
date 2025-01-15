import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
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
        <Link
            to='/newyear'
            className="flex flex-col items-center justify-center h-[90vh] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
            <div className="
                laptop:rounded-3xl laptop:border-4 laptop:shadow-2xl laptop:p-8
                ipad-v:rounded-lg ipad-v:border-2 ipad-v:shadow-xl ipad-v:p-5
                mobile:rounded mobile:shadow-md mobile:p-2
                border-white bg-white/30 backdrop-blur-md hover:scale-105 
                transition-transform duration-500 ease-in-out"
            >
                <h1 className="laptop:text-4xl mobile:text-2xl font-extrabold text-center text-white drop-shadow-lg mb-4">Countdown</h1>
                <p className="text-3xl font-semibold text-white drop-shadow-lg hidden laptop:block">
                    {timeLeft.days} {t('time.days')}, {timeLeft.hours} {t('time.hours')}, {timeLeft.minutes} {t('time.minutes')}, {timeLeft.seconds} {t('time.seconds')}
                </p>
                <p className="text-xl font-semibold text-white drop-shadow-lg hidden mobile:flex mobile:flex-col mobile:items-center">
                    <p>{timeLeft.days} {t('time.days')}</p>
                    <p>{timeLeft.hours} {t('time.hours')}</p>
                    <p>{timeLeft.minutes} {t('time.minutes')}</p>
                    <p>{timeLeft.seconds} {t('time.seconds')}</p>
                </p>
            </div>
        </Link>

    )
}

export default CountTime