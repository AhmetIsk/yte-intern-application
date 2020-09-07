import React, {useEffect, useState} from 'react';
import PaginationTable from "./components/table/PaginationTable";
import Button from "@material-ui/core/Button";
import PlusIcon from '@material-ui/icons/Add';
import axios from "axios";
import ReactDialog from "./components/common/ReactDialog";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBarLogin from "./components/table/AppBarLogin";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import SignIn from "./components/table/SignIn";
import SignUp from "./components/table/SignUp";
import LogInContainer from "./components/table/LogInContainer";
import SignUpContainer from "./components/table/SignUpContainer";
import MainPage from "./MainPage";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/AhmetIsk">
                Social Event Planner by Ahmet Işık
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function App() {

    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/login' component={LogInContainer} />
                <Route exact path='/signUp' component={SignUpContainer} />
                <Route exact path='/home' component={Home} />
            </Switch>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>

    );

}
