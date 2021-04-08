import './AppBar.css';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Button
} from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../helpers/Auth';

const useStyles = makeStyles((theme) => ({
    navButton: {
        color: '#FFF',
        opacity: '80%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appbar: {
        alignItems: 'center',
    }
}));

export default function MenuAppBar() {
    const authContext = useContext(AuthContext);
    //console.log(authContext);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        authContext.logout();
    }

    return (
        <AppBar position="static" color='primary'  >
            <Toolbar className="appBar">
                <Typography variant="h6">
                    Final project
                    </Typography>

                <nav className="navbar">
                    <ul>
                        <li>
                            <NavLink exact to="/overview" activeStyle={{ fontWeight: "bold", textDecoration: "underline", textDecorationColor: "#4B2C20" }}><Button className={classes.navButton}>Overview</Button></NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/" activeStyle={{ fontWeight: "bold", textDecoration: "underline", textDecorationColor: "#4B2C20" }}><Button className={classes.navButton}>About</Button></NavLink>
                        </li>
                    </ul>
                </nav>

                {!authContext.isAuth && (
                    <Link to="/login"><Button variant='outlined' color='inherit' /* onClick={function (event) { handleChange(); handleClose(); }} */>Log in</Button></Link>
                )}
                {authContext.isAuth && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            className="iconbutton"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                            className='menu'
                        >
                            <MenuItem onClick={handleClose}><Link to="/user">Profile</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/dashboard">Admin</Link></MenuItem>
                            <MenuItem onClick={function (event) { handleLogOut(); handleClose(); }}><Link to="/logout">Log out</Link></MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}