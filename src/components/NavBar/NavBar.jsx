//https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82 
//Updated version 17 April 2019 (by Олег Чулановский)

import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import accountCircle from '../../assets/account_circle.svg';
import { Link } from "react-router-dom";
import Button from '../Button/Button'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

function Nav(props) {
    const [open, setOpen] = useState(false);
    const node = useRef();

    const handleMenu = () => {
        setOpen(!open);
    }

    const handleLogOut = () => {
        props.handleLogOut();
        notifySuccess();
    }

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const notifySuccess = () => {
        toast.success("You are now logged out. Goodbye 👋", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    return (
        <nav className="navbar">
            <h1>
                <Link to="/">Fullstack Project</Link>
            </h1>

            {!props.auth && (
                <Link to="/login">
                    <Button label="log in" />
                </Link>
            )}
            {props.auth && (
                <div onClick={handleMenu} className="navbar-icon" ref={node}>
                    <img src={accountCircle} alt="Account Circle icon" onClick={handleMenu} />

                    {open &&
                        <div className="navbar dropdown">
                            <ul className="navbar dropdown-content">
                                <li onClick={handleMenu} className="dropdown-li">
                                    <Link to="/user">Profile</Link>
                                </li>

                                {props.role === "manager" &&
                                    <li onClick={handleMenu}>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>}

                                <li onClick={function () { handleLogOut(); handleMenu(); }}>
                                    <Link to="/login">Log out</Link>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            )}
        </nav>
    );
}

Nav.defaultProps = {
    auth: false,
    role: null,
}

Nav.propTypes = {
    /** 
     * The auth prop indicate if a user is logged in or not
    */
    auth: PropTypes.bool,

    /** 
     * The handleLogOut method is ran when a logged in user presses 'Log out'
    */
    handleLogOut: PropTypes.func,

    /**
     * The role is the current role of the logged in user. It decides if the user can accsess the dashboard or not.
     */
    role: PropTypes.oneOf(['gardener', 'manager', null]),
}

export default Nav;