import { useState, useEffect } from 'react'
import { Logo } from '../assets/images/index'
import Dropdown from './Dropdown'
import PillNav from './PillNav'
import { IoHomeOutline } from "react-icons/io5"
import { BsCalendarEvent } from "react-icons/bs"
import { LuMessageCircleHeart } from "react-icons/lu"
import { useTranslation } from 'react-i18next'
import { FaRegImages } from "react-icons/fa"

const Navbar = () => {
    const [t] = useTranslation('global')
    const [isScrolled, setIsScrolled] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <div
            className={`fixed top-0 w-full z-40 px-6 transition-all duration-300 shadow-md ${isScrolled ? 'py-2 bg-slate-100' : 'py-4 bg-slate-50'}`}
        >
            <div className='flex items-center relative gap-9'>
                <div className='flex items-center gap-1'>
                    <div className={`${isScrolled ? 'h-10 w-full' : 'h-16 w-full'}`}>
                        <img src={Logo} alt='' className='w-full h-full object-cover' />
                    </div>
                    <h2 className='font-bold text-lg font-zendots'>
                        MonMon
                    </h2>
                </div>
                <div className='flex items-center space-x-2'>
                    <PillNav
                        to='/'
                        icon={<IoHomeOutline className={`${isScrolled ? 'text-sm' : 'text-lg'}`} />}
                        active='text-blue-500 border-b-blue-500 border-b-2'
                        className={`${isScrolled ? 'px-4 py-2' : 'px-6 py-4'}`}
                    >
                        {t('route.home')}
                    </PillNav>
                    <PillNav
                        to='/gallery'
                        icon={<FaRegImages className={`${isScrolled ? 'text-sm' : 'text-lg'}`} />}
                        active='text-blue-500 border-b-blue-500 border-b-2'
                        className={`${isScrolled ? 'px-4 py-2' : 'px-6 py-4'}`}
                    >
                        {t('route.gallery')}
                    </PillNav>
                    <PillNav
                        to='/inlove'
                        icon={<LuMessageCircleHeart className={`${isScrolled ? 'text-sm' : 'text-lg'}`} />}
                        active='text-pink-500 border-b-pink-500 border-b-2'
                        className={`${isScrolled ? 'px-4 py-2' : 'px-6 py-4'}`}
                    >
                        {t('route.inlove')}
                    </PillNav>

                </div>
                <div className='absolute right-0'>
                    <div className='flex items-center gap-1'>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <PillNav
                                    to="#"
                                    icon={<BsCalendarEvent />}
                                    className={`${isScrolled ? 'px-4 py-2' : 'px-6 py-4'}`}
                                >
                                    {t('route.events')}
                                </PillNav>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="left" width="48">
                                <Dropdown.Link to="/countdown">{t('route.countdown')}</Dropdown.Link>
                                <Dropdown.Link to="/newyear">{t('route.lunar')}</Dropdown.Link>
                                <Dropdown.Link to="/christmas">{t('route.christmas')}</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Trigger>
                                Menu
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="48">
                                <Dropdown.Link to="/settings">{t('route.settings')}</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar