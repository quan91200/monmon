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
            <div className={`flex items-center relative justify-between px-6 transition-all duration-300 ipad-v:py-2 bg-transparent ${isScrolled ? 'py-2 laptop:bg-[#ec489980] mobile:bg-[#3b82f666]' : 'py-4 '}`}>
                <div className='flex items-center gap-1'>
                    <div className={`${isScrolled ? 'h-10 w-full' : 'h-16 w-full'}`}>
                        <img src={Logo} alt='' className='w-full h-full object-cover' />
                    </div>
                    <h2 className='font-bold text-lg font-zendots hidden sm:flex'>
                        MonMon
                    </h2>
                </div>
                <div className='ipad-v:flex ipad-v:items-center ipad-v:space-x-2 ipad-v:justify-between hidden'>
                    <div className='flex items-center space-x-2'>
                        <PillNav
                            to='/'
                            icon={<IoHomeOutline className={`${isScrolled ? 'text-sm' : 'text-lg'}`} />}
                            active='text-blue-500 border-b-blue-500 border-b-2'
                            className={`${isScrolled ? 'p-2' : 'p-4'} hover:bg-blue-300 hover:text-white`}
                        >
                            {t('route.home')}
                        </PillNav>
                        <PillNav
                            to='/gallery'
                            icon={<FaRegImages className={`${isScrolled ? 'text-sm' : 'text-lg'}`} />}
                            active='text-orange-500 border-b-orange-500 border-b-2'
                            className={`${isScrolled ? 'p-2' : 'p-4'} hover:bg-orange-300 hover:text-white`}
                        >
                            {t('route.gallery')}
                        </PillNav>
                        <PillNav
                            to='/inlove'
                            icon={<LuMessageCircleHeart className={`${isScrolled ? 'text-sm' : 'text-lg'}`} />}
                            active='text-pink-500 border-b-pink-500 border-b-2'
                            className={`${isScrolled ? 'p-2' : 'p-4'} hover:bg-pink-300 hover:text-white`}
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
                                    className={`${isScrolled ? 'p-2' : 'p-4'} sm:p-4 hover:bg-red-300 hover:text-white`}
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
                <div className='ipad-v:hidden flex items-center'>
                    <button
                        onClick={handleShowDropdownMobile}
                        className='hover:text-blue-500 transition duration-300 hover:scale-95'
                    >
                        <LiaHamburgerSolid size={30} />
                    </button>
                </div>
            </div>
            <div className={(showNavigationDropdown ? 'block' : 'hidden') + ' ipad-v:hidden bg-[#3b82f666]'}>
                <div className='bg-[(255, 255, 255, .5)] flex flex-col'>
                    <Link
                        onClick={handleShowDropdownMobile}
                        to='/'
                        className='px-3 py-2 hover:text-white backdrop-blur-0 font-bold hover:bg-blue-500'
                    >
                        {t('route.home')}
                    </Link>
                    <Link
                        onClick={handleShowDropdownMobile}
                        to='/gallery'
                        className='px-3 py-2 hover:text-white backdrop-blur-0 font-bold hover:bg-orange-500'
                    >
                        {t('route.gallery')}
                    </Link>
                    <Link
                        onClick={handleShowDropdownMobile}
                        to='/inlove'
                        className='px-3 py-2 hover:text-white backdrop-blur-0 font-bold hover:bg-pink-500'
                    >
                        {t('route.inlove')}
                    </Link>
                    <Link
                        onClick={handleShowDropdownMobile}
                        to='/newyear'
                        className='px-3 py-2 hover:text-white backdrop-blur-0 font-bold hover:bg-red-500'
                    >
                        {t('route.lunar')}
                    </Link>
                    <Link
                        onClick={handleShowDropdownMobile}
                        to='/settings'
                        className='px-3 py-2 hover:text-white backdrop-blur-0 font-bold hover:bg-gray-500'
                    >
                        {t('route.settings')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar