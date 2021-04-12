import './UserList.css';
import UserListItem from '../UserListItem/UserListItem'

function UserList({ users, handleDeleteClick, handleEditClick }) {
    return (
        <ul>
            {users.map((users) => (<UserListItem handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} key={users.email} user={users} />))}
        </ul>
    );
}

UserList.defultProps = {
    users: []
}

export default UserList;