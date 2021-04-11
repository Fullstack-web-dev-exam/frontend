import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { fetchAllUsers, deleteUser } from '../../api/users';
import PopupDelete from '../UserList/PopupDelete';

function withUsersFetch(WrappedComponent) {
    class UserListHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                users: [],
                isLoading: true,
                error: null,
                delete: false,
                selectedUser: {}
            };
        }

        async componentDidMount() {
            this._isMounted = true;
            await this.fetchData();
        }

        fetchData = async () => {
            const headers = this.context.generateHeaders();
            console.log(headers);
            const res = await fetchAllUsers(headers)

            if (res.error) {
                this._isMounted && this.setState({
                    error: res.error
                })
            } else {
                this._isMounted && this.setState({
                    users: res.data,
                    isLoading: false,
                    error: null
                })
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        selectDelete = (user) => {
            this.setState({ delete: true, selectedUser: user });
        }

        deleteUser = async () => {
            const deletedEmail = { email: this.state.selectedUser.email };
            console.log(deletedEmail);

            const headers = await this.context.generateHeaders();
            console.log(headers);
            const res = await deleteUser(headers.headers, deletedEmail);

            await this.fetchData();

            if (res.error) {
                this.setState({
                    error: res.error
                })
            } else {
                this.setState({
                    delete: false,
                    selectedUser: {},
                    error: null
                })
            }
        }

        abortDelete = () => {
            this.setState({
                delete: false,
                selectedUser: {}
            })
        }

        render() {
            return (
                <>
                    <WrappedComponent handleDeleteClick={this.selectDelete} users={this.state.users} {...this.props} />
                    {this.state.delete && <PopupDelete onAbortClick={this.abortDelete} onDeleteUser={this.deleteUser} user={this.state.selectedUser} />}
                </>
            );
        }
    }

    return UserListHOC
}

export default withUsersFetch;