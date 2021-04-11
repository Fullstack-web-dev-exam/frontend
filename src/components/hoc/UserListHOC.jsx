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
                error: null
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

        render() {
            return (
                <WrappedComponent users={this.state.users} {...this.props}/>
            );
        }
    }

    return UserListHOC
}

export default withUsersFetch;