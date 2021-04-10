import './UserListItem.css';

function UserListItem({ user }) {
    return (<li>
        <div className="container">
            <h2>{user.name} {user.surname}</h2>
            <h3>Role: {user.role}</h3>
            <p><b>Email:</b> {user.email}</p>
            <div className="user-list-item-buttons">
                <button className="edit-button">edit</button>
                <button className="delete-button">delete</button>
            </div>
        </div>
    </li>)
}

export default UserListItem;