import './my-profile.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import accountCircle from '../../assets/person_black_24dp.svg';

function MyProfile({ selectedUser, handleEditClick }) {
    console.log(handleEditClick);

    return (
        <div className="container">
            <img src={accountCircle} alt="Account Circle icon" />
            <h2>{selectedUser.name} {selectedUser.surname}</h2>
            <h3>Role: {selectedUser.role}</h3>
            <p><b>Email:</b> {selectedUser.email}</p>
            <Button onClick={handleEditClick} label="edit profile" variant="secondary" />
        </div>
    );
}

MyProfile.defaultProps = {
    selectedUser: {
        email: 'N/A',
        name: 'N/A, ',
        role: 'gardener',
        surname: 'N/A',
    }
}

MyProfile.propTypes = {
    /** The selectedUser object should include name, surname, role, and email. 
     * These values should be strings.  */
    selectedUser: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager']),
        surname: PropTypes.string,
    }),
    
    /** handleEditClick is the handler for when the user presses the edit button.  */
    handleEditClick: PropTypes.func.isRequired
}

export default MyProfile;