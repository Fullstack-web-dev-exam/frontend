import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { createUser } from '../../api/users';

/**
 * @param WrappedComponent 
 * @returns AddUserHOC
 */
function addUserBackend(WrappedComponent) {
    class AddUserHOC extends Component {
        static contextType = AuthContext;

        onSubmit = async (userObject) => {
            //Send the information stored in the state to the back-end
            const headers = this.context.generateHeaders();

            await createUser(headers, userObject);
        }

        render() { 
            return (
                <WrappedComponent onSubmitHandler={this.onSubmit} />
            );
        }
    }
    
    return AddUserHOC;
}

export default addUserBackend;