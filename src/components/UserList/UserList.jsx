import './UserList.css';
import UserListItem from '../UserListItem/UserListItem'

function UserList({ users, handleDeleteClick }) {
    return (
        <ul>
            {users.map((users) => (<UserListItem handleDeleteClick={handleDeleteClick} key={users.email} user={users} />))}
        </ul>
    );
}

UserList.defultProps = {
    users: []
}

export default UserList;