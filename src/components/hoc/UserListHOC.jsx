import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { fetchAllUsers, deleteUser } from '../../api/users';
import PopupDelete from '../UserList/PopupDelete';
import PopupEdit from '../UserList/PopupEdit';

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
                edit: false,
                selectedUser: {}
            };
        }

        async componentDidMount() {
            this._isMounted = true;
            await this.fetchData();
        }

        fetchData = async () => {
            const headers = this.context.generateHeaders();
            //console.log(headers);
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

        selectEdit = (user) => {
            this.setState({ edit: true, selectedUser: user });
        }

        deleteUser = async () => {
            const deletedEmail = { email: this.state.selectedUser.email };
            //console.log(deletedEmail);

            const headers = await this.context.generateHeaders();
            //console.log(headers);
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

        editUser = async () => {
            await this.fetchData();
            this.setState({
                edit: false,
                selectedUser: {},
                error: null
            })
        }

        cancelAction = () => {
            this.setState({
                delete: false,
                edit: false,
                selectedUser: {}
            })
        }

        render() {
            return (
                <>
                    <WrappedComponent handleEditClick={this.selectEdit} handleDeleteClick={this.selectDelete} users={this.state.users} {...this.props} />
                    {this.state.edit && <PopupEdit onAbortClick={this.cancelAction} onEditUser={this.editUser} user={this.state.selectedUser} />}
                    {this.state.delete && <PopupDelete onAbortClick={this.cancelAction} onDeleteUser={this.deleteUser} user={this.state.selectedUser} />}
                </>
            );
        }
    }

    return UserListHOC
}

export default withUsersFetch;