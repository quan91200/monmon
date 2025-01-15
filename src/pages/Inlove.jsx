import userData from "../api/users.json"
import TimeSince from "../components/TimeSince"
import { manImg, womenImg } from "../assets/images"
import { FaHeart } from "react-icons/fa"
import SlideShow from '../components/SlideShow'
import { useTranslation } from 'react-i18next'

const Inlove = () => {
    const users = userData.users
    const yourDate = userData.date
    const man = users[1]
    const women = users[2]
    const elapsedTime = TimeSince({ startDate: yourDate })
    const [t] = useTranslation("global")
    const slides = [
        (
            <div key="slide1" className="flex items-center justify-center space-x-32">
                <div className="flex flex-col items-center space-y-8">
                    <div className="w-48 h-48">
                        <img
                            src={man.avatar || manImg}
                            alt=""
                            className="w-full h-full object-cover rounded-full border-2 border-blue-500"
                        />
                    </div>
                    <h3 className="font-semibold text-2xl">{man.name}</h3>
                    <p className="font-zen-dots text-xl">({man.nickname})</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className="flex animate-pulse-scale">
                        <FaHeart className="text-red-500" size={80} />
                    </span>
                    <p className="text-xl mt-4">
                        {elapsedTime.totalDays} {t('time.days')}, {elapsedTime.hours} {t('time.hours')}, {elapsedTime.minutes} {t('time.minutes')}, {elapsedTime.seconds} {t('time.seconds')}
                    </p>
                </div>
                <div className="flex flex-col items-center space-y-8">
                    <div className="w-48 h-48">
                        <img
                            src={women.avatar || womenImg}
                            alt=""
                            className="w-full h-full object-cover rounded-full border-2 border-pink-500"
                        />
                    </div>
                    <h3 className="font-semibold text-2xl">{women.name}</h3>
                    <p className="font-zen-dots text-xl">({women.nickname})</p>
                </div>
            </div>
        ),
        (
            <div key="slide2" className="flex items-center justify-center space-x-8 text-gray-50 font-bungee font-bold">
                <div className="flex items-center justify-center bg-violet-500 h-24 w-24 shadow-md rounded">
                    <div className='flex flex-col items-center justify-center space-y-2'>
                        <span className='text-xl'>{elapsedTime.years}</span>
                        <span className='px-2 rounded-lg bg-white text-violet-500'>{t('time.year')}</span>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-violet-500 h-24 w-24 shadow-md rounded">
                    <div className='flex flex-col items-center justify-center space-y-2'>
                        <span className='text-xl'>{elapsedTime.months}</span>
                        <span className='px-2 rounded-lg bg-white text-violet-500'>{t('time.months')}</span>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-violet-500 h-24 w-24 shadow-md rounded">
                    <div className='flex flex-col items-center justify-center space-y-2'>
                        <span className='text-xl'>{elapsedTime.weeks}</span>
                        <span className='px-2 rounded-lg bg-white text-violet-500'>{t('time.weeks')}</span>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-violet-500 h-24 w-24 shadow-md rounded">
                    <div className='flex flex-col items-center justify-center space-y-2'>
                        <span className='text-xl'>{elapsedTime.days}</span>
                        <span className='px-2 rounded-lg bg-white text-violet-500'>{t('time.days')}</span>
                    </div>
                </div>
            </div>
        ),
    ]
    return (
        <div className="flex items-center justify-center bg-pink-200 px-5" style={{ minHeight: "calc(100vh - 80px)" }}>
            <SlideShow
                slides={slides}
                autoPlay={true}
                autoPlayInterval={5000}
                showIndicators={true}
                showControls={false}
                transitionDuration={500}
            />
        </div>

    )
}

export default Inlove