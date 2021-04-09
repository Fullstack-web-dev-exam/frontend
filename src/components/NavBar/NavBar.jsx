import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../helpers/Auth';
import './NavBar.css';
import accountCircle from '../../assets/account_circle.svg';

function Nav(props) {
    const authContext = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let menu;
    console.log(open);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogOut = () => {
        authContext.logout();
    }

    if(open){
        menu = (
            <ul>
                <Link to="/login"><li onClick={function (event) {handleClose(); handleLogOut()}}>Logout</li></Link>
            </ul>
        );
    }

    return (
        <nav className="navbar">
            <h1>Fullstack Project</h1>
            <ul>
                <li>
                    <Link to="/overview">Overview</Link>
                </li>
                <li>
                    <Link to="/">About</Link>
                </li>
            </ul>
            {!authContext.isAuth && (
                <Link to="/login"><button>Log in</button></Link>
            )}
            {authContext.isAuth && (
                <div>
                    <img src={accountCircle} alt="Account Circle icon" onClick={handleMenu} />
                </div>
            )}
            {menu}
        </nav>
    );
}

export default Nav;