import React, { Component } from 'react';
import { forgot } from '../../api/users';

function forgotBackend(WrappedComponent) {
    class ForgotPassHOC extends Component {
        
        onSubmit = async (userEmail) => {
            await forgot({userEmail});
        }

        render() { 
            return (
                <WrappedComponent onSubmitHandler={this.onSubmit} />
            );
        }
    }
    
    return ForgotPassHOC;
}

export default forgotBackend;