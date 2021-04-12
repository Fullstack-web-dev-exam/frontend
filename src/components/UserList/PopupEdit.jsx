import './Popup.css';
import updateUserBackend from '../hoc/UpdateUserHOC';
import UpdateUser from '../UpdateUser/UpdateUser';
import Button from '../Button/Button'

function PopupDelete(props) {
    //console.log(props.user.email)

    const UpdateUserHOC = updateUserBackend(UpdateUser);
    return (
        <div className="popup-userlist">
            <div className="popup-content">
                <UpdateUserHOC onUpdateForm={props.onUpdateForm} selectedUser={props.user} place="dashboard" />
                <Button onClick={props.onAbortClick} variant="danger" label="cancel"/>
            </div>
        </div>
    );
}

export default PopupDelete;