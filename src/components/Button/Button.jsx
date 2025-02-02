import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ text, className, onClick }) => {
  return (
    <button onClick={onClick} className={`button-root ${className}`}>{text}</button>
  )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default Button 