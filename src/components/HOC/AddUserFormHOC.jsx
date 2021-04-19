import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { createUser } from '../../api/users';

function addUserBackend(WrappedComponent) {
    class AddUserHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = { 
                error: null
            };
        }

        onSubmit = async (userObject) => {
            const headers = this.context.generateHeaders();

            //Send the information stored in the state to the back-end
            try {
                await createUser(headers, userObject);
            } catch (error) {
                this.setState({
                    error: error.response.data.message
                })
            }
        }

        render() { 
            return (
                <WrappedComponent onSubmitHandler={this.onSubmit} error={this.state.error}/>
            );
        }
    }
    
    return AddUserHOC;
}

export default addUserBackend;