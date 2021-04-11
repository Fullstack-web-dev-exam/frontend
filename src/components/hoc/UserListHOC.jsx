import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { fetchAllUsers } from '../../api/users';

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
            const headers = this.context.generateHeaders();
            const res = await fetchAllUsers(headers)
            //console.log(res.data)

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

        deleteUser = () => {
            const deletedEmail = {email: this.state.selectedUser.email};
            console.log(deletedEmail);
            this.setState({
                delete: false,
                selectedUser: {}
            })
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
                    {this.state.delete &&
                        <div className="popup-delete">
                            <p>Are you sure you want to delete the user {this.state.selectedUser.name} {this.state.selectedUser.surname}?</p>
                            <button onClick={this.abortDelete} className="edit-button">Cancel</button>
                            <button onClick={this.deleteUser} className="delete-button">Confirm Delete</button>
                        </div>}
                </>
            );
        }
    }

    return UserListHOC
}

export default withUsersFetch;