function MyProfile({ myUser }) {

    return (
        <div className="container">
            <p>Dette er din profil</p>
            <h2>{myUser.name} {myUser.surname}</h2>
            <h3>Role: {myUser.role}</h3>
            <p><b>Email:</b> {myUser.email}</p>
        </div>
    );
}

export default MyProfile;