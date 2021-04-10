import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/Auth';

function AccountMenu(props) {
    const authContext = useContext(AuthContext)

    const handleLogOut = () => {
        authContext.logout();
    }

    return (
        <div>
            <ul>
                <li>
                    <Link to="/user"><button onClick={props.handleClose}>Profile</button></Link>
                </li>
                {authContext.role === "manager" && <li>
                    <Link to="/dashboard"><button onClick={props.handleClose}>Dashboard</button></Link>
                </li>}
                <li>
                    <Link to="/login"><button onClick={function (event) { handleLogOut(); props.handleClose();}}>Log out</button></Link>
                </li>
            </ul>
        </div>
    );
}

export default AccountMenu;