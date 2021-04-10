import './UserList.css';
import UserListItem from '../UserListItem/UserListItem'

function UserList({ users }) {
    return (
        <ul>
            {users.map((users) => (<UserListItem key={users.email} user={users} />))}
        </ul>
    );
}

UserList.defultProps = {
    users: []
}

export default UserList;