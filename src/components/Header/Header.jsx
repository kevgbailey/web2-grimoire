import PropTypes from 'prop-types'
import './Header.css'

const Header = ({ text }) => {
    return (
        <div className = "header-root" >{text}</div>
    )
}
Header.propTypes = {
    text: PropTypes.string.isRequired,
}

export default Header