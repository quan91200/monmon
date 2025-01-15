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
            <div key="slide1" className="flex ipad-v:flex-row items-center justify-center laptop:space-x-32 ipad-v:space-x-12 mobile:flex-col mobile:py-5">
                <div className="flex flex-col items-center laptop:space-y-8 mobile:space-y-2">
                    <div className="laptop:w-48 laptop:h-48 ipad-v:w-40 ipad-v:h-40 mobile:h-24 mobile:w-24">
                        <img
                            src={man.avatar || manImg}
                            alt=""
                            className="w-full h-full object-cover rounded-full border-2 border-blue-500"
                        />
                    </div>
                    <h3 className="font-semibold md:text-2xl sm:text-lg whitespace-nowrap">{man.name}</h3>
                    <p className="font-zen-dots text-xl">({man.nickname})</p>
                </div>
                <div className="flex flex-col items-center my-2">
                    <span className="flex animate-pulse-scale">
                        <FaHeart className="text-red-500" size={80} />
                    </span>
                    <span className="laptop:text-2xl mobile:text-xl flex ipad-v:flex-row mobile:flex-col items-center gap-2">
                        <p>{elapsedTime.totalDays} {t('time.days')}</p>
                        <div className="flex gap-2">
                            <p>{elapsedTime.hours} {t('time.hours')}</p>
                            <p>{elapsedTime.minutes} {t('time.minutes')}</p>
                            <p>{elapsedTime.seconds} {t('time.seconds')}</p>
                        </div>
                    </span>
                </div>
                <div className="flex flex-col items-center laptop:space-y-8 mobile:space-y-2">
                    <div className="laptop:w-48 laptop:h-48 ipad-v:w-40 ipad-v:h-40 mobile:h-24 mobile:w-24">
                        <img
                            src={women.avatar || womenImg}
                            alt=""
                            className="w-full h-full object-cover rounded-full border-2 border-pink-500"
                        />
                    </div>
                    <h3 className="font-semibold md:text-2xl sm:text-lg whitespace-nowrap">{women.name}</h3>
                    <p className="font-zen-dots text-xl">({women.nickname})</p>
                </div>
            </div>
        ),
        (
            <div key="slide2" className="flex ipad-v:flex-row ipad-v:justify-center ipad-v:space-x-8 text-gray-50 font-bungee font-bold mobile:flex-col items-center mobile:space-y-5 mobile:mt-5">
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
        <div
            className="flex items-center justify-center 
                bg-gradient-to-r from-blue-500 via-pink-300 to-red-500 px-5"
            style={{ minHeight: "calc(100vh - 80px)" }}
        >
            <SlideShow
                slides={slides}
                autoPlay={false}
                autoPlayInterval={5000}
                showControls={true}
                transitionDuration={500}
            />
        </div>

    )
}

export default Inlove