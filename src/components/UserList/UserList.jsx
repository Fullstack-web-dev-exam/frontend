import React, { Component } from 'react';
import './UserList.css';
/* import { AuthContext } from '../../helpers/Auth'; */
import UserListItem from '../UserListItem/UserListItem'
import { fetchAllUsers } from '../../api/users';

//Get this from backend
const usersFromBackEnd = [
    { _id: 1, name: "Cornelius", surname: "Singblær", email: "sug@meg", role: 'Manager' },
    { _id: 2, name: "Glenn", surname: "Hansen", role: 'Gardener', email: "test@epost1" },
    { _id: 3, name: "Tom", surname: "Famous", role: 'Gardener', email: "test@epost2" }
];

class UserList extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
        };
    }

    //Jeg er retard og vet ikke hvordan dette fungerer :)
    //https://stackoverflow.com/q/52249012/14447555

    //Lecture 10-1

    fakeRequest = () =>
        new Promise(resolve => setTimeout(() => resolve(usersFromBackEnd), 1000));

    async componentDidMount() {
        const res = await fetchAllUsers()
        console.log(res)

        this.fakeRequest().then(usersFromBackEnd => this.setState({
            users: usersFromBackEnd
        }));
    }


    listItems() {
        return this.state.users.map(user => <UserListItem key={user._id} user={user} />)
    }

    render() {
        return (
            <ul>
                {this.listItems()}
            </ul>
        );
    }
}

export default UserList;