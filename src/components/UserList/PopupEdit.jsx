import './Popup.css';
import updateUserBackend from '../hoc/UpdateUserHOC';
import UpdateUser from '../UpdateUser/UpdateUser';

function PopupDelete(props) {
    //console.log(props.user.email)

    const UpdateUserHOC = updateUserBackend(UpdateUser);
    return (
        <div className="popup-userlist">
            <div className="popup-content">
                <UpdateUserHOC selectedUserEmail={props.user.email} place="dashboard" />
                <button onClick={props.onAbortClick} className="edit-button">Cancel</button>
                <button onClick={props.onEditUser} className="delete-button">Edit</button>
            </div>
        </div>
    );
}

export default PopupDelete;