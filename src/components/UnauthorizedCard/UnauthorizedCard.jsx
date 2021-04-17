import errorIcon from '../../assets/error_black_24dp.svg';
import { Link } from "react-router-dom";
import './UnauthorizedCard.css';

/**
 * ## How it works
 * The UnauthorizedCard component is an extremely simple component that renders a card 
 * letting the user know they currently are unauthorized to visit this page. 
 * It displays a link letting the user go back the to home page.
 * 
 * ## Usage
 * 1. Import the UnauthorizedCard component from '`src/components/UnauthorizedCard/UnauthorizedCard`' 
 * 2. To render the component write `<UnauthorizedCard />` where you want the card to render on the page.
 */

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