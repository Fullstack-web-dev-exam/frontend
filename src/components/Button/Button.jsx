import PropTypes from 'prop-types';
import './Button.css';

function Button(props) {
    const { variant, type, onClick, disabled, label, size, active } = props;

    return (
        <button
            className={`button ${variant} ${size}-size ${active === true ? 'active' : ''}`}
            disabled={disabled}
            type={type}
            onClick={onClick}>
            {label.trim()}
        </button>
    )
}

Button.defaultProps = {
    active: false,
    disabled: false,
    size: 'full',
    type: 'button',
    label: 'default button',
    variant: 'primary'
}

Button.propTypes = {
    /** Checks if the button should be active (visually only).
     * Currently, only the 'secondary-outlined" receives styles when active is set.
    */
    active: PropTypes.bool,

    /** Checks if the button should be disabled (HTML disabled attribute). */
    disabled: PropTypes.bool,

    /** The text to display on the button. */
    label: PropTypes.string.isRequired,

    /** The OnClick eventHandler. */
    onClick: PropTypes.func,

    /** The width of the button. */
    size: PropTypes.oneOf(['full', 'half']),

    /** The type of the button (HTML type attribute). */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),

    /** The variant of the button changes the color. */
    variant: PropTypes.oneOf(['primary', 'secondary', 'secondary-outlined', 'danger']).isRequired,
}

export default Button;