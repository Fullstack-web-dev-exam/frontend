import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { fetchUser } from '../../api/users';

function withUserBackEnd(WrappedComponent) {
    class MyProfileHOC extends Component {
        
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {
                myUser: [],
                isLoading: true,
                error: null
            };
        }

        async componentDidMount() {
            /* this.isMounted = true; */
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

        render() {
            if (this.state.error) {
                return (<p>{this.state.error}</p>)
            }
            if (this.state.isLoading) {
                return (<p>Loading...</p>)
            }
            return (
                <WrappedComponent myUser={this.state.myUser} {...this.props} />
            );
        }
    }

    return MyProfileHOC;
}

export default withUserBackEnd;