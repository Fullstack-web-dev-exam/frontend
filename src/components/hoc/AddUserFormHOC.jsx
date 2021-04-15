import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { createUser } from '../../api/users';

function addUserBackend(WrappedComponent) {
    class AddUserHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {  }
        }

        onSubmit = async (userObject) => {
            //Send the information stored in the state to the back-end
            const headers = this.context.generateHeaders();

            await createUser(headers, userObject);
        }

        render() { 
            return (
                <WrappedComponent onSubmit={this.onSubmit} />
            );
        }
    }
    
    return AddUserHOC;
}

export default addUserBackend;