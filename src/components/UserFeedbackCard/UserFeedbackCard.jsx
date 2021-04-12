import './UserFeedbackCard.css';

function UserFeedbackCard(props) {
    const { variant, onClick, feedbackText } = props;

    return (
        <p
            className={`user-feedback ${variant || 'error'}`}
            onClick={onClick}>
            <strong>{variant}:</strong> {feedbackText}
        </p>
    )
}

export default UserFeedbackCard;