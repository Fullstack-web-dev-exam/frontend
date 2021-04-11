import './Popup.css';

function PopupDelete(props) {
    console.log(props.user)
    return (
        <div className="popup-userlist">
            <div className="popup-content">
                <p>Are you sure you want to delete the user {props.user.name} {props.user.surname}?</p>
                <button onClick={props.onAbortClick} className="edit-button">Cancel</button>
                <button onClick={props.onDeleteUser} className="delete-button">Confirm Delete</button>
            </div>
        </div>
    );
}

export default PopupDelete;