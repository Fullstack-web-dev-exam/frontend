import React, { Component } from 'react';
import withUsersFetch from '../hoc/UserListHOC';
import UserList from '../UserList/UserList';
import AddUserForm from '../AddUser/AddUserForm';
import Button from '../Button/Button'

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
                    <Button onClick={this.toggleAddUser} variant="secondary" label="Add a user" size="half"/>
                    <Button onClick={this.toggleAllUsers} variant="secondary" label="See all users" size="half"/>
                </div>
                {this.state.addUser && <AddUserForm />}
                {this.state.seeUsers && <UserListWithHOC />}
            </>
        );
    }
}

export default Dashboard;