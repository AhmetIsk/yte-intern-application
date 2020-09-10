import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function LogInComponent(props) {

    const classa = useStyles();

    return (
        <div className="center-page" >
            <div className={classa.paper} >
                <Avatar className={classa.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    style={{ backgroundColor: "#F2E5F3" }}
                    id="form_login">
                    <br />
                    <br />
                    <input
                        className={classa.form}
                        noValidate
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        name="username"
                        value={props.data.username}
                        placeholder="username"
                        onChange={props.handleChange}
                    >
                    </input>
                    <br />
                    <input
                        className={classa.form}
                        noValidate
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="password"
                        value={props.data.password}
                        placeholder="password"
                        onChange={props.handleChange}
                    >
                    </input>
                    <br />
                    <br />
                    <div className="center-page">
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                // onClick={props.handleChangeClick}
                                onClick={props.loginClicked}
                                className={classa.submit}
                                fullWidth
                            >
                                Log In
                            </Button>
                        </div>
                        {/*<div>*/}
                        {/*    /!*<Link*!/*/}
                        {/*    /!*    color="primary"*!/*/}
                        {/*    /!*    size = "small"*!/*/}
                        {/*    /!*    onClick={props.handleChangeClick2}*!/*/}
                        {/*    /!*    variant="body2"*!/*/}
                        {/*    /!*    className={classa.submit}*!/*/}
                        {/*    /!*    href="">*!/*/}
                        {/*    /!*    Don't have an account? Sign Up*!/*/}
                        {/*    /!*</Link>*!/*/}
                        {/*</div>*/}
                    </div>
                    <br />
                </form>
            </div>
        </div>
    )
}
export default LogInComponent;

// history.pushState({ id: 'admin-events' }, 'Events', 'https://localhost:44396/admin-events')