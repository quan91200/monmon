import Home from '../pages/Home'
import Inlove from '../pages/Inlove'
import NewYear from '../pages/NewYear'
import CountDown from '../pages/CountDown'
import Settings from '../pages/Settings'
import Christmas from '../pages/Christmas'
import Gallery from '../pages/Gallery'

const routes = [
    { path: "/", element: <Home />, layout: 'default' },
    { path: '/inlove', element: <Inlove />, layout: 'noFooter' },
    { path: '/newyear', element: <NewYear />, layout: null },
    { path: '/countdown', element: <CountDown />, layout: 'noFooter' },
    { path: '/settings', element: <Settings />, layout: 'noFooter' },
    { path: '/christmas', element: <Christmas />, layout: 'default' },
    { path: '/gallery', element: <Gallery />, layout: 'noFooter' },
]

export default routes