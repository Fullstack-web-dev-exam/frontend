import React, { Component } from 'react';
import './UserList.css';
import { AuthContext } from '../../helpers/Auth';
import UserListItem from '../UserListItem/UserListItem'
import { fetchAllUsers } from '../../api/users';

class UserList extends Component {
    static contextType = AuthContext;
    constructor() {
        super();
        this.state = {
            users: [],
            isLoading: true,
            error: null
        };
    }

    //Jeg er retard og vet ikke hvordan dette fungerer :)
    //https://stackoverflow.com/q/52249012/14447555

    //Lecture 10-1

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


    listItems() {
        return this.state.users.map(user => <UserListItem key={user.email} user={user} />)
    }

    render() {


        if (this.state.error) {
            //gjør mer ryddig senere
            return (
                <p>There is an error: {this.state.error}</p>
            )
        }

        if (this.state.isLoading) {
            return (
                <p>Loading...</p>
            )
        }

        return (
            <ul>
                {this.listItems()}
            </ul>
        );
    }
}

export default UserList;