//https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82 
//Updated version 17 April 2019 (by Олег Чулановский)

//accessibility burde bli forbedret

import React, { useContext, useState, useRef, useEffect } from 'react';
import './NavBar.css';
import accountCircle from '../../assets/account_circle.svg';
import { AuthContext } from '../../helpers/Auth';
import { Link } from "react-router-dom";

function Nav(props) {
    const authContext = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const node = useRef();

    const handleMenu = () => {
        setOpen(!open);
    }

    const handleLogOut = () => {
        authContext.logout();
    }

    const handleClickOutside = e => {
        console.log("clicking anywhere");
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

    return (
        <nav className="navbar">
            <h1>
                <Link to="/">Fullstack Project</Link>
            </h1>

            {!authContext.isAuth && (
                <Link to="/login"><button>Log in</button></Link>
            )}
            {authContext.isAuth && (
                <div onClick={handleMenu} className="navbar-icon" ref={node}>
                    <img src={accountCircle} alt="Account Circle icon" onClick={handleMenu} />

                    {open &&
                        <div className="navbar dropdown">
                            <ul className="navbar dropdown-content">
                                <li onClick={handleMenu} className="dropdown-li">
                                    <Link to="/user">Profile</Link>
                                </li>

                                {authContext.role === "manager" &&
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

export default Nav;