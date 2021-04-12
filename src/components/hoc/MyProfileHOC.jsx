import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { fetchUser } from '../../api/users';
import updateUserBackend from './UpdateUserHOC';
import UpdateUser from '../UpdateUser/UpdateUser';
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard'
import Loading from '../Loading/Loading';

function withUserBackEnd(WrappedComponent) {
    class MyProfileHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {
                myUser: [],
                isLoading: true,
                error: null,
                willEdit: false,
                successfullyUpdated: false
            };
        }

        async componentDidMount() {
            await this.fetchData();
        }

        fetchData = async () => {
            const headers = this.context.generateHeaders();
            const res = await fetchUser(headers)

            if (res.error) {
                this.setState({
                    error: res.error
                })
            } else {
                this.setState({
                    myUser: res.data.value,
                    isLoading: false,
                    error: null
                })
            }
        }

        toggleWillEdit = () => {
            this.setState({
                willEdit: !this.state.willEdit,
                successfullyUpdated: false
            })
        }

        handleCloseMessage = () => {
            this.setState({ successfullyUpdated: false })
        }

        handleSuccess = () => {
            this.setState({
                successfullyUpdated: true,
                willEdit: false
            })
        }

        render() {
            const UpdateUserHOC = updateUserBackend(UpdateUser);

            if (this.state.error) {
                return (<p>{this.state.error}</p>)
            }
            if (this.state.isLoading) {
                return (<Loading />);
            }
            return (
                <>
                    <WrappedComponent myUser={this.state.myUser} {...this.props} handleEditClick={this.toggleWillEdit} />
                    {this.state.successfullyUpdated && <UserFeedbackCard onClick={this.handleCloseMessage} variant="success" feedbackText="The user has been updated." />}
                    {this.state.willEdit && <UpdateUserHOC selectedUser={this.state.myUser} place="profile" onUpdateForm={() => { this.fetchData(); this.handleSuccess(); }} />}
                </>
            );
        }
    }

    return MyProfileHOC;
}

export default withUserBackEnd;