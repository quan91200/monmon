import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const BackButton = ({ to = '/', label = '', variant = 'primary', className = '', icon }) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(to)
    }

    const buttonClasses = {
        primary: 'bg-blue-500 text-white px-4 py-2 shadow hover:bg-blue-600',
        outline: 'border-2 border-blue-500 text-blue-500 px-4 py-2 shadow hover:bg-blue-100',
        secondary: 'bg-gray-500 text-white px-4 py-2 shadow hover:bg-gray-600',
        default: 'text-gray-500 hover:text-gray-50'
    }

    return (
        <button
            onClick={handleBack}
            className={`${buttonClasses[variant]} ${className} flex items-center space-x-1 rounded-lg`}
        >
            {icon ? icon : null}
            {label ? label : null}
        </button>
    )
}

BackButton.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'outline', 'secondary', 'default']),
    className: PropTypes.string,
    icon: PropTypes.element
}

export default BackButton