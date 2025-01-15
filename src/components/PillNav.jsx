import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const PillNav = ({ children, icon, to, className, active = '' }) => {
    const location = useLocation()
    const isActive = location.pathname === to

    return (
        <span
            className={`flex items-center space-x-2 transition-all duration-150 hover:bg-gray-300 outline-none focus:outline-none rounded-md ${className} ${isActive ? active : ''
                }`}
        >
            <Link to={to} className="flex items-center space-x-1">
                {icon && (
                    <span className={`${isActive ? active : ''}`}>{icon}</span>
                )}
                <span>{children}</span>
            </Link>
        </span>
    )
}

export default PillNav

PillNav.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.element,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    activeStyles: PropTypes.object,
    active: PropTypes.string
}