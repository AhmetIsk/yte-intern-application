import React, {useEffect, useState} from 'react';
import PaginationTable from "./components/table/PaginationTable";
import Button from "@material-ui/core/Button";
import PlusIcon from '@material-ui/icons/Add';
import axios from "axios";
import ReactDialog from "./components/common/ReactDialog";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBarLogin from "./components/table/AppBarLogin";

export default function MainPage(props) {

    const participantDialogFields = [
        {id: "name", label: "Name", type: "text"},
        {id: "surname", label: "Surname", type: "text"},
        {id: "email", label: "E-Mail", type: "email"},
        {id: "tcKimlikNo", label: "TC Kimlik No", type: "text"},
    ]

    let loggedIn = false;

    const [rows, updateRows] = useState([]);
    const [isAddParticipantModalOpen, updateIsAddParticipantModalOpen] = useState(false);

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    useEffect(() => {
        axios.get("/events")
            .then(response => {
                updateRows(response.data)
            })
    }, [])

    const toggleAddParticipantModal = () => {
        updateIsAddParticipantModalOpen(!isAddParticipantModalOpen);
    }



// olmadı burası
    const onAddParticipant = (nameOfEvent, inputData) => {
        console.log(inputData);

        toggleAddParticipantModal();
        axios.post("/events/" + nameOfEvent +"/participants", inputData)
            .then(response => {
                console.log(response.data);
                if (response.data.messageType === "SUCCESS") {
                    toast.success(response.data.message, toastOptions);
                    updateRows([...rows, inputData]);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            });
    }

    const eventTableColumns = [
        { label: 'Name of Event', id: 'nameOfEvent', minWidth: 170 },
        { label: 'Starting Date', id: 'startingDate', type: 'date' },
        { label: 'End Date', id: 'endDate', type: 'date' },
        { label: 'Address', id: 'address', type: 'address', minWidth: 170 },
        { label: 'Quota of Event', id: 'maxQuota', type: 'numeric'},
        {id: "joinEvent", label: "Join Event", align: "right", onClick: toggleAddParticipantModal}
    ]

    return (
        <div className="Home">
            <header className="MainPage-header">
                <AppBarLogin/>
            </header>
            <ReactDialog fields={participantDialogFields} title="Add New Participant" isOpen={isAddParticipantModalOpen}
                         onClose={toggleAddParticipantModal}
                         onSubmit={onAddParticipant}/>
            <PaginationTable rows={rows} columns={eventTableColumns}/>
            <ToastContainer/>
        </div>
    );

}
