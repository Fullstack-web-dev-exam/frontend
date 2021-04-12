import React, { Component } from 'react';
import withUsersFetch from '../hoc/UserListHOC';
import UserList from '../UserList/UserList';
import AddUserForm from '../AddUser/AddUserForm';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addUser: false,
            seeUsers: false
        }
    }

    toggleAddUser = () => {
        this.setState({
            addUser: !this.state.addUser,
            seeUsers: false
        });
    }

    toggleAllUsers = () => {
        this.setState({
            seeUsers: !this.state.seeUsers,
            addUser: false
        });
    }


    render() {
        const UserListWithHOC = withUsersFetch(UserList);
        
        return (
            <>
                <h1>Dashboard</h1>
                <div className="user-list-item-buttons">
                    <button onClick={this.toggleAddUser} className="edit-button">Add a user</button>
                    <button onClick={this.toggleAllUsers} className="edit-button">See all users</button>
                </div>
                {this.state.addUser && <AddUserForm />}
                {this.state.seeUsers && <UserListWithHOC />}
            </>
        );
    }
}

export default Dashboard;