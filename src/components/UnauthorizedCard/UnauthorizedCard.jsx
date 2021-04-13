import errorIcon from '../../assets/error_black_24dp.svg';
import { Link } from "react-router-dom";
import './UnauthorizedCard.css';

function UnauthorizedCard(props) {
    return (
        <div className="container unauthorized-pop-up">
            <img src={errorIcon} alt="" />
            <h1><span className="big-number unauthorized-pop-up">401</span> You are unauthorized</h1>
            <p className="unauthorized-pop-up">Return to the <Link to="/">Home Page</Link></p>
        </div>
    );
}

export default UnauthorizedCard;