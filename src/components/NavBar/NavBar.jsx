import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../helpers/Auth';
import './NavBar.css';
import accountCircle from '../../assets/account_circle.svg';
import AccountMenu from '../modal/modal';

function Nav(props) {
    const authContext = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);
    console.log(open);

    const handleMenu = () => {
        setAnchorEl(!anchorEl);
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
                    {anchorEl && <AccountMenu handleClose={handleMenu} />}
                </div>
                
            )}
        </nav>
    );
}

export default Nav;