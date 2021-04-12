import './Button.css';

/* 
Expects props:

-onClick: <any clickHandler>
-isDisabled: <boolean>
-label: <text to display on button>
-size: < "full" / "half" >
-variant: < "primary" / "secondary" / "danger" >
-buttonType < "button|submit|reset"

*/

function Button(props) {
    const { variant, type, onClick, disabled, label, size } = props;

    return (
        <button
            className={`button ${variant || 'primary'} ${size || 'full'}-size`}
            disabled={disabled}
            type={type || 'button'}
            onClick={onClick}>
            {label || 'button'}
        </button>
    )
}

export default Button;