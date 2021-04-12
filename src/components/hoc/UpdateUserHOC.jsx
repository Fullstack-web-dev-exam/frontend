import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { updateMyProfile, updateUser } from '../../api/users';

function updateUserBackend(WrappedComponent) {
    class UpdateUserHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            console.log(props);
            this.state = {
                data: [],
                error: null
            }
        }

        updateDashboard = async (userObject) => {
            console.log(userObject);
            const headers = this.context.generateHeaders();

            const res = await updateUser(headers, userObject);

            if(res.error){
                this.setState({ error: res.error });
            } else {
                this.setState({ data: userObject });
                //this.props.onUpdateForm();
            }
        }

        updateProfile = async (userObject) => {
            //console.log(userObject);
            const headers = this.context.generateHeaders();

            const res = await updateMyProfile(headers, userObject);

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

            return (<WrappedComponent selectedUserEmail={this.props.selectedUserEmail} place={this.props.place} onUpdateDashboard={this.updateDashboard} onUpdateProfile={this.updateProfile} />);
        }
    }

    return UpdateUserHOC;
}

export default updateUserBackend;