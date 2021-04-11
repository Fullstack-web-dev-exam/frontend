import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { updateUser } from '../../api/users';

function updateUserBackend(WrappedComponent) {
    class UpdateUserHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                error: null
            }
        }

        update = async (userObject) => {
            console.log(userObject);
            const headers = this.context.generateHeaders();
            
            const res = await updateUser(headers, userObject);

            if(res.error){
                this.setState({ error: res.error });
            } else {
                this.setState({ data: userObject });
            }
        }

        render() {
            if (this.state.error) {
                return (<p>{this.state.error}</p>)
            }

            return (<WrappedComponent onUpdate={this.update} />);
        }
    }

    return UpdateUserHOC;
}

export default updateUserBackend;