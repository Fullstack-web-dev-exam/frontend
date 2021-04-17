import PropTypes from 'prop-types';
import './UserFeedbackCard.css';

function UserFeedbackCard(props) {
    const { variant, onClick, feedbackText } = props;

    return (
        <p
            className={`user-feedback ${variant}`}
            onClick={onClick}>
            <strong>{variant}:</strong> {feedbackText}
        </p>
    )
}

UserFeedbackCard.defaultProps = {
    feedbackText: 'This is your feedback text'
}

UserFeedbackCard.propTypes = {
    /** The variant describes if the feedback is for an error or if it confirms a successful event. */
    variant: PropTypes.oneOf(['error', 'success']).isRequired,

    /** The text to display on the feedback card */
    feedbackText: PropTypes.string.isRequired,

    /** The OnClick eventHandler */
    onClick: PropTypes.func
}

export default UserFeedbackCard;