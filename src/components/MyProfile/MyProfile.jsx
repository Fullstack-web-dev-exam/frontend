import Button from '../Button/Button'

function MyProfile({ myUser, handleEditClick }) {
    console.log(handleEditClick);

    return (
        <div className="container">
            <h2>{myUser.name} {myUser.surname}</h2>
            <h3>Role: {myUser.role}</h3>
            <p><b>Email:</b> {myUser.email}</p>
            <Button onClick={handleEditClick} label="edit" variant="secondary"/>

        </div>
    );
}

export default MyProfile;