import './Popup.css';
import updateUserBackend from '../HOC/UpdateUserHOC';
import UpdateUser from '../UpdateUser/UpdateUser';
import PropTypes from 'prop-types';
import Button from '../Button/Button'

function Popup(props) {
    const { popupVariant, onUpdateForm, user, onAbortClick, onDeleteUser, place} = props

    const UpdateUserHOC = updateUserBackend(UpdateUser);
    return (
        <div className="popup-userlist">
            <div className="popup-content">
                {popupVariant === 'edit' &&
                    <UpdateUserHOC onUpdateForm={onUpdateForm} selectedUser={user} place={place} onAbortClick={onAbortClick} />
                }

                {popupVariant === 'delete' &&
                    <div className="container">
                        <p>Are you sure you want to delete the user <span className="bold">{user.name} {user.surname}</span>?</p>
                        <p className="low-emphasis-text">This action can not be undone!</p>

                        <div className="buttons-side-by-side">
                            <Button onClick={onAbortClick} label="Cancel" size="half" variant="secondary-outlined" />
                            <Button onClick={onDeleteUser} label="Confirm Delete" size="half" variant="danger" />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

Popup.defaultProps = {
    place: 'dashboard'
}

Popup.propTypes = {
    /** The user object should include name, surname, role, and email. 
     * These values should be strings. */
    user: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager', '']),
        surname: PropTypes.string,
    }).isRequired,

    /** The variant corresponds to the user action. Either deleting a user or updating the information of a user (or their self). */
    popupVariant: PropTypes.oneOf(['edit', 'delete']).isRequired,

    /** onAbortClick is the handler for when the user presses the cancel button.  */
    onAbortClick: PropTypes.func.isRequired,

    /** onDeleteUser is the handler for when the user presses the delete button.  */
    onDeleteUser: PropTypes.func,

    /** onUpdateForm is sent from the UserListHOC. It fetches the users data from the back-end. */
    onUpdateForm: PropTypes.func,

    place: PropTypes.oneOf(['dashboard']).isRequired,
}

export default Popup;