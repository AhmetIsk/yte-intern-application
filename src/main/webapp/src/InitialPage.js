import React from 'react';
import PaginationTable from "./components/table/PaginationTable";
import Button from "@material-ui/core/Button";
import PlusIcon from '@material-ui/icons/Add';
import axios from "axios";
import ReactDialog from "./components/common/ReactDialog";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBarLogin from "./components/table/AppBarLogin";
import AppBarLogout from "./components/table/AppBarLogout";
import ReactDialogInfo from "./components/common/ReactDialogInfo";
import MyBarChart from "./components/table/MyBarChart";
import {BarChart} from "@material-ui/icons";
import "./InitialPage.css"
import {Link} from "react-router-dom";
import AuthenticationService from "./components/service/AuthenticationService";
import Toolbar from "@material-ui/core/Toolbar";

export default function InitialPage() {

    return(
        <div className="initialP">
            {/*<link rel="stylesheet" type="text/css" href="./InitialPage.css">*/}
            <header>
                <h1 className="initialPHeader"> Welcome to Social Event Planner </h1>
                <p className="paragraph">Social Event Planner is a website to enroll events around us about everything from educational aim to entertainment and have a great time while enjoying!</p>

                <h1 className="initialPH">SOCIALIZE</h1>
                <h1 className="initialPH">EASILY</h1>
                <h1 className="initialPH">FASTER</h1>
            </header>
            <nav >
                <ul className="nav-links">
                    <Link to='/main'>
                        <Button size="large" variant="contained" color="primary" to='/main' > Get Started </Button>
                    </Link>
                </ul>
            </nav>
        </div>
    );

}