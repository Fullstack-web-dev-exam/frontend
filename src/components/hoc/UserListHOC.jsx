import React, { Component } from 'react';
import { fetchAllUsers } from '../../api/users';
import { AuthContext } from '../../helpers/Auth';

function withUsersFetch(WrappedComponent) {
    class UserListHOC extends Component {
        static contextType = AuthContext;
        constructor() {
            super();
            this.state = {
                users: [],
                isLoading: true,
                error: null
            };
        }

        async componentDidMount() {
            const headers = this.context.generateHeaders();
            const res = await fetchAllUsers(headers)
            console.log(res.data)
    
            if (res.error) {
                this.setState({
                    error: res.error
                })
            } else {
                this.setState({
                    users: res.data,
                    isLoading: false,
                    error: null
                })
            }
        }

        render() {
            return (
                <WrappedComponent users={this.state.users} {...this.props}/>
            );
        }
    }

    return UserListHOC
}

export default withUsersFetch;