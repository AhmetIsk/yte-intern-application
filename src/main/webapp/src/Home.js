import React, {useEffect, useState} from 'react';
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

export default function Home(props) {
    const eventDialogFields = [
        { label: 'Name of Event', id: 'nameOfEvent' },
        {  id: 'startingDate', type: 'date' },
        {  id: 'endDate', type: 'date' },
        { label: 'Address', id: 'address', type: 'address' },
        { label: 'Quota of Event', id: 'maxQuota', type: 'numeric'},
    ]


    const participantDialogFields = [
        {id: "name", label: "Name", type: "text"},
        {id: "surname", label: "Surname", type: "text"},
        {id: "email", label: "E-Mail", type: "email"},
        {id: "tcKimlikNo", label: "TC Kimlik No", type: "text"},
    ]

    const [rows, updateRows] = useState([]);
    const [isAddEventModalOpen, updateIsAddEventModalOpen] = useState(false);
    const [isUpdateEventModalOpen, updateIsUpdateEventModalOpen] = useState(false);
    const [isAddParticipantModalOpen, updateIsAddParticipantModalOpen] = useState(false);
    const [isSeeDetailsOpen, updateIsSeeDetailsOpen] = useState(false);

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


    const toggleAddEventModal = () => {
        updateIsAddEventModalOpen(!isAddEventModalOpen);
    }
    const toggleAddParticipantModal = () => {
        updateIsAddParticipantModalOpen(!isAddParticipantModalOpen);
    }
    const toggleUpdateEventModal = () => {
        updateIsUpdateEventModalOpen(!isUpdateEventModalOpen);
    }
    const toggleSeeDetails = () => {
        updateIsSeeDetailsOpen(!isSeeDetailsOpen);
    }


    const submitEventAdd = (inputData) => {
        toggleAddEventModal();
        console.log(inputData);
        axios.post("/events", inputData)
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

    const onEventUpdate = (inputData, nameOfEvent) => {
        toggleUpdateEventModal();
        console.log(inputData);
        axios.put("/events/" + nameOfEvent)
            .then(response => {
                console.log(response.data);
                if (response.data.messageType === "SUCCESS") {
                    updateRows([...rows, inputData]);
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            })
    }

    const onEventDelete = (nameOfEvent) => {
        axios.delete("/events/" + nameOfEvent)
            .then(response => {
                if (response.data.messageType === "SUCCESS") {
                    updateRows(rows.filter((event) => event.nameOfEvent !== nameOfEvent));
                    toast.success(response.data.message, toastOptions);
                } else {
                    toast.error(response.data.message, toastOptions);
                }
            })
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
        {id: "update", label: "Update Event", align: "right", onClick: toggleUpdateEventModal},
        {id: "delete", label: "Delete Event", align: "right", onClick: onEventDelete},
        {id: "joinEvent", label: "Join Event", align: "right", onClick: toggleAddParticipantModal},
        {id: "showDetails", label: "Show Details", align: "right", onClick: toggleSeeDetails}
    ]

    const eventData = [
        { label: 'Name of Event', id: 'nameOfEvent', participantNum: 55 },
        // { year: '1960', population: 3.018 },
        // { year: '1970', population: 3.682 },
        // { year: '1980', population: 4.440 },
        // { year: '1990', population: 5.310 },
        // { year: '2000', population: 6.127 },
        // { year: '2010', population: 6.930 },
    ];

    const [open, setOpen] = React.useState(false);

    return (
        <div className="Home">
            <header className="Home-header">
                <AppBarLogout/>
            </header>
            {/*<MyBarChart/>*/}
            <Button variant="contained"
                    color="secondary"
                    style={{float: "right", margin: "1vw"}}
                    onClick={toggleAddEventModal}
                    startIcon={<PlusIcon/>}>
                Add New Event
            </Button>
            <Button variant="contained"
                    color="secondary"
                    style={{float: "right", margin: "1vw" }}
                    onClick={() => setOpen(!open)}
                    startIcon={<BarChart/>}>

                Show Events On Chart
            </Button>

            <ReactDialog fields={eventDialogFields} title="Add New Event" isOpen={isAddEventModalOpen}
                         onClose={toggleAddEventModal}
                         onSubmit={submitEventAdd}/>
            <ReactDialog fields={eventDialogFields} title="Update Event" isOpen={isUpdateEventModalOpen}
                         onClose={toggleUpdateEventModal}
                         onSubmit={onEventUpdate}/>
            <ReactDialog fields={participantDialogFields} title="Add New Participant" isOpen={isAddParticipantModalOpen}
                         onClose={toggleAddParticipantModal}
                         onSubmit={onAddParticipant}/>
            <ReactDialogInfo rows={rows} columns={participantDialogFields} title="Participant Details of Specified Event" isOpen={isSeeDetailsOpen}
                             onClose={toggleSeeDetails}/>
            <PaginationTable rows={rows} columns={eventTableColumns}/>

            {open ? <MyBarChart rows={rows} columns={eventData}/> : toggleSeeDetails}

            <ToastContainer rows={rows} columns={participantDialogFields} />


        </div>

    );

}
