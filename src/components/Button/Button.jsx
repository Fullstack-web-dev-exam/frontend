import React, { Component } from 'react';
import './Button.css';

/* 
Expects:

-handleOnClick: <any clickHandler>
-isDisabled: <boolean>
-label: <text to display on button>
-size: < "full-size" / "half-size" >
-variant: < "primary" / "secondary" / "danger" >

*/

class Button extends Component {
    render() {
        return (
            <button 
                className={`button ${this.props.variant} ${this.props.size}`} 
                disabled={this.props.isDisabled}
                onClick={this.props.handleOnClick}>
                {this.props.label}
            </button>
        );
    }
}

export default Button;