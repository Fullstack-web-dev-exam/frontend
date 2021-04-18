import './NotFound.css';
import pageNotFoundIcon from '../../assets/page_not_found_black_24dp.svg';
import { Link } from "react-router-dom";

/**
 * ## How it works
 * The `NotFound` component is an extremely simple component that renders a card letting 
 * the user know a page wasn't found (404 error). It displays a link letting the user 
 * go back the to home page
 * 
 * ## Usage
 * 1. Import the NotFound component from '`src/components/Notfound/NotFound`' 
 * 2. To render the component write `<NotFound />` where you want the card to render on the page.
 */
function NotFound(props) {
    return (
        <div className="container not-found-pop-up">
            <img src={pageNotFoundIcon} alt="" />
            <h1><span className="big-number not-found-pop-up">404</span> Page not found</h1>
            <p className="not-found-pop-up">Return to the <Link to="/">Home Page</Link></p>
        </div>
    )
}

export default NotFound;