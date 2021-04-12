import Button from '../Button/Button';
import accountCircle from '../../assets/person_black_24dp.svg';
import './my-profile.css';

function MyProfile({ myUser, handleEditClick }) {
    console.log(handleEditClick);

    return (
        <div className="container">
            <img src={accountCircle} alt="Account Circle icon" />
            <h2>{myUser.name} {myUser.surname}</h2>
            <h3>Role: {myUser.role}</h3>
            <p><b>Email:</b> {myUser.email}</p>
            <Button onClick={handleEditClick} label="edit profile" variant="secondary"/>
        </div>
    );
}

export default MyProfile;