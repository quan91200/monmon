import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'

const NoFooter = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='mt-24'>{children}</div>
        </div>
    )
}

export default NoFooter

NoFooter.propTypes = {
    children: PropTypes.node.isRequired
}