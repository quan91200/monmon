import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropTypes from 'prop-types'

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='mt-24'>{children}</div>
            <Footer />
        </div>
    )
}

export default DefaultLayout

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}