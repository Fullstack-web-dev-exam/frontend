import React, { Component } from 'react';

class UserListItem extends Component {

    render() {
        return (
            <li>
                <div className="container">
                    <h2>{this.props.user.name} {this.props.user.surname}</h2>
                    <h3>Role: {this.props.user.role}</h3>
                    <p><b>Email:</b> {this.props.user.email}</p>
                    <div className="user-list-item-buttons">
                        <button className="edit-button">edit</button>
                        <button className="delete-button">delete</button>
                    </div>
                </div>
            </li>
        );
    }
}

export default UserListItem;