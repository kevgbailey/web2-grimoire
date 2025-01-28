import PropTypes from 'prop-types'
import './Header.css'

const Header = ({ text, className }) => {
    return (
        <div className={`header-root ${className}`}>{text}</div>
    )
}

Header.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Header