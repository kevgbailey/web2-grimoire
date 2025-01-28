import PropTypes from 'prop-types'
import './Text.css'

const Text = ({ text, className }) => {
    return (
        <div className={`text-root ${className}`}>{text}</div>
    )
}

Text.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Text