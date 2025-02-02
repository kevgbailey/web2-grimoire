import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ value, onChange, placeholder }) => {
    return (
        <input className="input-root"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};
Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default Input;