import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHeader from "../table/TableHeader";
import TableContent from "../table/TableContent";
import TablePageController from "../table/TablePageController";
import TableContentInfo from "../table/TableContentInfo";

export default function ReactDialogInfo(props) {

    const [inputData, updateInputData] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        let newInputData = {...inputData};
        newInputData[event.target.id] = event.target.value;
        updateInputData(newInputData);
    }
    const [currentPage, changePage] = useState(0);
    const [rowsPerPage, changeRowsPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {
        changePage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        changeRowsPerPage(event.target.value);
        changePage(0);
    };

    return (
        <Dialog open={props.isOpen} onClose={props.onClose}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHeader columns={props.columns}/>
                            <TableContentInfo rows={props.rows} page={currentPage} rowsPerPage={rowsPerPage}
                                          columns={props.columns} onAddParticipant={props.onAddParticipant}/>
                        </Table>
                    </TableContainer>
                    <TablePageController count={props.rows.length}
                                         rowsPerPage={rowsPerPage}
                                         page={currentPage} handleChangePage={handleChangePage}
                                         handleChangeRowsPerPage={handleChangeRowsPerPage}/>
                </Paper>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );

}