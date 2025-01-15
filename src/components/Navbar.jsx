import { useState, useEffect } from 'react'
import { Logo } from '../assets/images/index'
import Dropdown from './Dropdown'
import PillNav from './PillNav'
import { IoHomeOutline } from "react-icons/io5"
import { BsCalendarEvent } from "react-icons/bs"
import { LuMessageCircleHeart } from "react-icons/lu"
import { useTranslation } from 'react-i18next'
import { FaRegImages } from "react-icons/fa"
import { LiaHamburgerSolid } from "react-icons/lia"
import { Link } from 'react-router-dom'

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

    const [showNavigationDropdown, setShowNavigationDropdown] = useState(false)
    const handleShowDropdownMobile = () => { setShowNavigationDropdown(prev => !prev) }
    return (
        <div className='fixed top-0 w-full z-40 shadow-md'>
            <div className={`flex items-center relative justify-between px-6 transition-all duration-300 mmd:py-2 ${isScrolled ? 'py-2 bg-[(255, 255, 255, 0.7)]' : 'py-4 bg-slate-50'}`}>
                {/*Icon */}
                <div className='flex items-center gap-1'>
                    <div className={`${isScrolled ? 'h-10 w-full' : 'h-16 w-full'}`}>
                        <img src={Logo} alt='' className='w-full h-full object-cover' />
                    </div>
                    <h2 className='font-bold text-lg font-zendots hidden sm:flex'>
                        MonMon
                    </h2>
                </div>
                {/*Laptop - Ipad */}
                <div className='mmd:flex mmd:items-center mmd:space-x-2 mmd:justify-between hidden'>
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
                            active='text-orange-500 border-b-orange-500 border-b-2'
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
                    <div className='flex items-center gap-1'>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <PillNav
                                    to="#"
                                    icon={<BsCalendarEvent />}
                                    className={`${isScrolled ? 'px-4 py-2' : 'px-6 py-4'} sm:px-4 sm:py-2`}
                                >
                                    {t('route.events')}
                                </PillNav>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="48">
                                <Dropdown.Link to="/countdown">{t('route.countdown')}</Dropdown.Link>
                                <Dropdown.Link to="/newyear">{t('route.lunar')}</Dropdown.Link>
                                <Dropdown.Link to="/christmas">{t('route.christmas')}</Dropdown.Link>
                                <Dropdown.Link to="/settings">{t('route.settings')}</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
                {/* Ipad Mini - Mobile */}
                <div className='mmd:hidden flex items-center'>
                    <button
                        onClick={handleShowDropdownMobile}
                        className='hover:text-blue-500 transition duration-300 hover:scale-95'
                    >
                        <LiaHamburgerSolid size={30} />
                    </button>
                </div>
            </div>
            <div className={(showNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                <div className='space-y-1 py-2 bg-gray-200 flex flex-col'>
                    <span className='px-3 py-1 hover:text-white hover:bg-blue-500 cursor-pointer'>
                        <Link to='/'>{t('route.home')}</Link>
                    </span>
                    <span className='px-3 py-1 hover:text-white hover:bg-orange-500 cursor-pointer'>
                        <Link to='/gallery'>{t('route.gallery')}</Link>
                    </span>
                    <span className='px-3 py-1 hover:text-white hover:bg-pink-500 cursor-pointer'>
                        <Link to='/inlove'>{t('route.inlove')}</Link>
                    </span>
                    <span className='px-3 py-1 hover:text-white hover:bg-red-500 cursor-pointer'>
                        <Link to='/newyear'>{t('route.lunar')}</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Navbar