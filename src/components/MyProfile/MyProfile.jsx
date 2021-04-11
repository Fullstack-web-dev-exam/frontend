function MyProfile({ myUser, handleEditClick }) {
    console.log(handleEditClick);

    return (
        <div className="container">
            <h2>{myUser.name} {myUser.surname}</h2>
            <h3>Role: {myUser.role}</h3>
            <p><b>Email:</b> {myUser.email}</p>
            <button onClick={handleEditClick} className="edit-button">edit</button>
        </div>
    );
}

export default MyProfile;