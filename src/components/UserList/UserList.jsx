import './UserList.css';
import UserListItem from '../UserListItem/UserListItem';
import PropTypes from 'prop-types';

function UserList({ users, handleDeleteClick, handleEditClick }) {
    return (
        <ul className="user-list">
            {users.map((users) => (<UserListItem handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} key={users.email} user={users} />))}
        </ul>
    );
}

UserList.propTypes = {
    /** The user object should include name, surname, role, and email. 
     * These values should be strings. */
     users: PropTypes.array.isRequired,

    /** handleDeleteClick is an eventHandler that is connected to the delete button on a UserItemCard component */
    handleDeleteClick: PropTypes.func.isRequired,

    /** handleEditClick is an eventHandler that is connected to the edit button on the UserListItem component */
    handleEditClick: PropTypes.func.isRequired,
}

export default UserList;