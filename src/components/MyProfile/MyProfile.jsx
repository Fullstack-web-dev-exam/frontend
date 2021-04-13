import './my-profile.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import accountCircle from '../../assets/person_black_24dp.svg';

function MyProfile({ myUser, handleEditClick }) {
    console.log(handleEditClick);

    return (
        <div className="container">
            <img src={accountCircle} alt="Account Circle icon" />
            <h2>{myUser.name} {myUser.surname}</h2>
            <h3>Role: {myUser.role}</h3>
            <p><b>Email:</b> {myUser.email}</p>
            <Button onClick={handleEditClick} label="edit profile" variant="secondary" />
        </div>
    );
}

MyProfile.defaultProps = {
    myUser: {
        email: 'N/A',
        name: 'First name: N/A, ',
        role: 'gardener',
        surname: 'Surname: N/A',
    }
}

MyProfile.propTypes = {
    /** The myUser object should include name, surname, role, and email. 
     * These values should be strings.  */
    myUser: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager']),
        surname: PropTypes.string,
    }),
    
    /** handleEditClick is the handler for when the user presses the edit button.  */
    handleEditClick: PropTypes.func.isRequired
}

export default MyProfile;