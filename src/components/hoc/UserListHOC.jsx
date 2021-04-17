import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { fetchAllUsers, deleteUser, forgot } from '../../api/users';
import Popup from '../Popup/Popup'
import { toast } from 'react-toastify'
import Loading from '../Loading/Loading';

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

        resetPassword = async () => {
            const email = this.state.selectedUser.email;
            const res = await forgot(email);
            console.log(res);

            if(res.error){
                this.setState({ error: res.error });
                this.notifyError();
            } else {
                this.notifySuccessReset();
                this.setState({
                    edit: false,
                    selectedUser: {},
                    error: null
                })
            }
        }

        fetchData = async () => {
            const headers = this.context.generateHeaders();
            const res = await fetchAllUsers(headers)

            if (res.error) {
                this._isMounted && this.setState({
                    error: res.error
                })
            } else {
                this._isMounted && this.setState({
                    users: res.data,
                    isLoading: false,
                    error: null,
                    edit: false
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
            const emailToDelete = { email: this.state.selectedUser.email };
            const headers = await this.context.generateHeaders();
            const res = await deleteUser(headers.headers, emailToDelete);

            if (res.error) {
                this.setState({
                    error: res.error
                })
                this.notifyError();
            } else {
                this.setState({
                    delete: false,
                    selectedUser: {},
                    error: null
                });
                await this.fetchData();
                this.notifySuccess();
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

        //Part of 'react-toastify'
        notifySuccess = () => {
            toast.success("The user has been deleted. 🗑️", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        };

        notifySuccessReset = () => {
            toast.success("An email with instructions have been sent to users email!");
        }

        //Part of 'react-toastify'
        notifyError = () => {
            toast.error("Something went wrong... please try again.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        };

        render() {
            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <WrappedComponent handleEditClick={this.selectEdit} handleDeleteClick={this.selectDelete} users={this.state.users} {...this.props} />
                    {this.state.edit &&
                        
                        //Update user form
                        <Popup
                            onAbortClick={this.cancelAction}
                            onEditUser={this.editUser}
                            onUpdateForm={this.fetchData}
                            onResetClick={this.resetPassword}
                            place="dashboard"
                            popupVariant="edit"
                            user={this.state.selectedUser}
                        />}

                    {this.state.delete &&
                        <Popup
                            onAbortClick={this.cancelAction}
                            onDeleteUser={this.deleteUser}
                            popupVariant="delete"
                            user={this.state.selectedUser}
                        />}
                </>
            );
        }
    }

    return UserListHOC
}

export default withUsersFetch;