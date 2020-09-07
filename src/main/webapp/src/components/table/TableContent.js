import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DetailsIcon from '@material-ui/icons/Details';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default function TableContent(props) {

  const [open, setOpen] = React.useState(false);

  let iconMap = {
    "update": <CreateIcon/>,
    "delete": <DeleteIcon/>,
    "joinEvent": <AddIcon/>,
    "showDetails": <DetailsIcon/>
  }


  return (
    <TableBody>
      {getRowSlice().map(row => createTableRow(row))}
    </TableBody>

  );

  function getRowSlice() {
    return props
      .rows
      .slice(calculatePageBeginning(), calculatePageEnd());
  }

  function calculatePageBeginning() {
    return props.page * props.rowsPerPage;
  }

  function calculatePageEnd() {
    return props.page * props.rowsPerPage + props.rowsPerPage;
  }


  function createTableRow(row) {
    return (
      <TableRow hover role="checkbox" key={row.nameOfEvent}>
        {props.columns.map(column => createTableCell(column, row))}
      </TableRow>
    );
  }


  function createTableCell(column, row) {

    let cellValue = row[column.id];
    if (column.id === "update" || column.id === "delete" || column.id === "joinEvent" || column.id === "showDetails") {
      cellValue = createIcon(column.id, column.onClick, row.nameOfEvent);
    }

    return (
      <TableCell key={column.id} align={column.align}>
        {cellValue}
      </TableCell>
    );
  }

  function createIcon(key, onClick, nameOfEvent) {
    return (
      <IconButton aria-label={key} color="secondary" onClick={() => onClick(nameOfEvent)}>
        {iconMap[key]}
      </IconButton>
    )
  }

}