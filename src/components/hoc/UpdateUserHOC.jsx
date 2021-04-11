import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { updateMyProfile } from '../../api/users';

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
            console.log("over res");
            const res = await updateMyProfile(headers, userObject);
            console.log("Under res");

            if(res.error){
                this.setState({ error: res.error });
            } else {
                this.setState({ data: userObject });
                this.props.onUpdateForm();
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