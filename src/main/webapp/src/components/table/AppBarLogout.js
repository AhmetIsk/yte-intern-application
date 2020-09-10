import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import AuthenticationService from "../service/AuthenticationService";
import Avatar from "@material-ui/core/Avatar";

export default function ButtonAppBar() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Avatar className={classes.orange}>AI</Avatar>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Welcome to Event Planner
                    </Typography>
                    <nav >
                        <ul className="nav-links">
                            <Link style={classes} to='/'>
                                <Button onClick={AuthenticationService.logout} variant="contained" color="secondary" to='/' >Logout</Button>
                            </Link>
                        </ul>
                    </nav>
                    {/*<Button color="inherit" path='/login' onClick={classes} to='login' ><li>Login</li></Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}
