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
import ReactDialogQR from "./components/common/ReactDialogQR";

export default function Home(props) {
    const eventDialogFieldsUpdate = [
        { label: 'Name of Event', id: 'nameOfEvent' },
        {  id: 'startingDate', type: 'date' },
        {  id: 'endDate', type: 'date' },
        { label: 'Address', id: 'address', type: 'address' },
        { label: 'Quota of Event', id: 'maxQuota', type: 'numeric'},
        { label: 'Participant number of Event (please enter the last value)', id: 'participantNum', type: 'numeric'}
    ]

    const eventDialogFields = [
        { label: 'Name of Event', id: 'nameOfEvent' },
        {  id: 'startingDate', type: 'date' },
        {  id: 'endDate', type: 'date' },
        { label: 'Address', id: 'address', type: 'address' },
        { label: 'Quota of Event', id: 'maxQuota', type: 'numeric'}
    ]


    const participantDialogFields = [
        {id: "name", label: "Name", type: "text"},
        {id: "surname", label: "Surname", type: "text"},
        {id: "email", label: "E-Mail", type: "email"},
        {id: "tcKimlikNo", label: "TC Kimlik No", type: "text"},
    ]

    const [rows, updateRows] = useState([]);
    const [rows1, updateRows1] = useState([]);
    const [rows2, updateRows2] = useState([]);
    const [isAddEventModalOpen, updateIsAddEventModalOpen] = useState(false);
    const [isUpdateEventModalOpen, updateIsUpdateEventModalOpen] = useState(false);
    const [isAddParticipantModalOpen, updateIsAddParticipantModalOpen] = useState(false);
    const [isSeeDetailsOpen, updateIsSeeDetailsOpen] = useState(false);
    const [tempName, updateTemp] = useState();
    const [open, setOpen] = useState(false);

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

    // useEffect(() => {
    //
    //     const nameOfEvent =onclick(nameOfEvent);;
    //     axios.get("/events" + nameOfEvent)
    //         .then(response => {
    //             updateRows1(response.data)
    //         })
    // }, [])


    const toggleAddEventModal = () => {
        updateIsAddEventModalOpen(!isAddEventModalOpen);
    }
    const toggleShowBarChart = () => {
        setOpen(!open);
        axios.get("/events")
            .then(response => {
                updateRows2(response.data)
            });
        console.log(rows1);
        console.log(rows2);
        console.log(rows);
    }
    const toggleAddParticipantModal = () => {
        updateIsAddParticipantModalOpen(!isAddParticipantModalOpen);
    }
    const toggleUpdateEventModal = () => {
        updateIsUpdateEventModalOpen(!isUpdateEventModalOpen);
    }
    const temp = (nameOfEvent) => {
        let newTempName = nameOfEvent;
        updateTemp(newTempName);
        console.log(tempName);
        console.log(nameOfEvent);
        updateIsUpdateEventModalOpen(!isUpdateEventModalOpen);
    }
    const tempTwo = (nameOfEvent) => {
        let newTempName = nameOfEvent;
        updateTemp(newTempName);
        console.log(tempName);
        console.log(nameOfEvent);
        updateIsAddParticipantModalOpen(!isAddParticipantModalOpen);
    }
    const toggleSeeDetails = () => {
        updateIsSeeDetailsOpen(!isSeeDetailsOpen);
    }



    const onParticipantsShow = (nameOfEvent) => {
        toggleSeeDetails();
        console.log(nameOfEvent);
        axios.get("/events/" + nameOfEvent + "/participants")
                .then(response => {
                    updateRows1(response.data)
                });
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

    const onEventUpdate = (inputData) => {
        //console.log(tempName);
        toggleUpdateEventModal();
        //console.log(inputData);
        // updateRows(rows.filter((event) => event.nameOfEvent !== tempName));
        axios.put("/events/" + tempName, inputData)
            .then(response => {
                console.log(response.data);
                if (response.data.messageType === "SUCCESS") {
                    updateRows([...rows, inputData]);
                    // updateRows([...rows, inputData]);
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

    const onAddParticipant = (inputData) => {
        console.log(inputData);
        toggleAddParticipantModal();
        axios.post("/events/" + tempName +"/participants", inputData)
            .then(response => {
                console.log(response.data);
                if (response.data.messageType === "SUCCESS") {
                    toast.success(response.data.message, toastOptions);
                    //updateRows([...rows, inputData]);
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
        {id: "update", label: "Update Event", align: "right", onClick: temp},
        {id: "delete", label: "Delete Event", align: "right", onClick: onEventDelete},
        {id: "joinEvent", label: "Join Event", align: "right", onClick: tempTwo},
        {id: "showDetails", label: "Show Details", align: "right", onClick: onParticipantsShow}
    ]

    // const eventData = [
    //     { label: 'Name of Event', id: 'nameOfEvent', participantNum: 'number' },
    //     // { year: '1960', population: 3.018 },
    //     // { year: '1970', population: 3.682 },
    //     // { year: '1980', population: 4.440 },
    //     // { year: '1990', population: 5.310 },
    //     // { year: '2000', population: 6.127 },
    //     // { year: '2010', population: 6.930 },
    // ];

    const eventData = [
        { label: 'Name of Event', id: "nameOfEvent" },
        { label: 'Number', id: "participantNum" }
        // { year: '1970', population: 3.682 },
        // { year: '1980', population: 4.440 },
        // { year: '1990', population: 5.310 },
        // { year: '2000', population: 6.127 },
        // { year: '2010', population: 6.930 },
    ];



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
                    onClick={toggleShowBarChart}
                    startIcon={<BarChart/>}>

                Show Events On Chart
            </Button>

            <ReactDialog fields={eventDialogFields} title="Add New Event" isOpen={isAddEventModalOpen}
                         onClose={toggleAddEventModal}
                         onSubmit={submitEventAdd}/>
            <ReactDialog fields={eventDialogFieldsUpdate} title="Update Event" isOpen={isUpdateEventModalOpen}
                         onClose={toggleUpdateEventModal}
                         onSubmit={onEventUpdate}/>
            <ReactDialogQR fields={participantDialogFields} title="Add New Participant" isOpen={isAddParticipantModalOpen}
                         onClose={toggleAddParticipantModal}
                         onShowCode={tempName}
                         onSubmit={onAddParticipant}/>
            <ReactDialogInfo rows={rows1} columns={participantDialogFields} title="Participant Details of Specified Event" isOpen={isSeeDetailsOpen}
                             onClose={toggleSeeDetails}/>
            <PaginationTable rows={rows} columns={eventTableColumns} />

            {open ? <MyBarChart rows={rows} /> : toggleSeeDetails}

            <ToastContainer rows={rows} columns={participantDialogFields} />


        </div>

    );

}
