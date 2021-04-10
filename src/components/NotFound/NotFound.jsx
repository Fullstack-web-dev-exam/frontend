import React, { Component } from 'react';
import pageNotFoundIcon from '../../assets/page_not_found_black_24dp.svg';
import { Link } from "react-router-dom";

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="container not-found-pop-up">
                <img src={pageNotFoundIcon} alt="" />
                <h1><span className="big-number">404</span> Page not found</h1>
                <p>Return to the <Link to="/">Home Page</Link></p>
            </div>
        );
    }
}

export default NotFound;