import './UserListItem.css';
import Button from '../Button/Button'
import PropTypes from 'prop-types';

function UserListItem({ user, handleDeleteClick, handleEditClick }) {
    return (<li>
        <div className="container userlist">
            <h2>{user.name} {user.surname}</h2>
            <h3>Role: {user.role}</h3>
            <p><b>Email:</b> {user.email}</p>
            <div className="user-list-item-buttons">
                {user.role === "gardener" ? <Button onClick={() => handleEditClick(user)}  variant="secondary" label="edit" size="half"/> : <Button variant="secondary" label="edit" disabled={true} size="half"/>}
                {user.role === "gardener" ? <Button onClick={() => handleDeleteClick(user)}  variant="danger" label="delete" size="half"/> : <Button variant="danger" label="delete" disabled={true} size="half"/>}
            </div>
        </div>
    </li>)
}

UserListItem.propTypes = {
    /** The user object should include name, surname, role, and email. 
     * These values should be strings.  */
     user: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager']),
        surname: PropTypes.string,
    }).isRequired,
    
    /** handleEditClick is the handler for when the user presses the edit button.  */
    handleEditClick: PropTypes.func,

    /** handleDeleteClick is the handler for when the user presses the delete button.  */
    handleDeleteClick: PropTypes.func
}

export default UserListItem;