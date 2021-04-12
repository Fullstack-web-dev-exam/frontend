import './UserListItem.css';
import Button from '../Button/Button'

function UserListItem({ user, handleDeleteClick, handleEditClick }) {
    return (<li>
        <div className="container">
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

export default UserListItem;