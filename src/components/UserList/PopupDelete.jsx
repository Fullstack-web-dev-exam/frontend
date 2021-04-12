import './Popup.css';
import Button from '../Button/Button'

function PopupDelete(props) {
    console.log(props.user)
    return (
        <div className="popup-userlist">
            <div className="popup-content">
                <p>Are you sure you want to delete the user {props.user.name} {props.user.surname}?</p>

                <div className="buttons-side-by-side">
                    <Button onClick={props.onAbortClick} label="Cancel" size="half" variant="secondary"/>
                    <Button onClick={props.onDeleteUser} label="Confirm Delete" size="half" variant="danger"/>
                </div>
            </div>
        </div>
    );
}

export default PopupDelete;