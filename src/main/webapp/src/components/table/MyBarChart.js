import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";

// const data3 = [
//     // { label: 'Name of Event', id: 'nameOfEvent', participantNum: 55 },
//     { year: '1960', population: 3.018 },
//     { year: '1970', population: 3.682 },
//     { year: '1980', population: 4.440 },
//     { year: '1990', population: 5.310 },
//     { year: '2000', population: 6.127 },
//     { year: '2010', population: 6.930 },
// ];


// export default class MyBarChart extends React.PureComponent {
export default function MyBartChart(props) {
    const eventsData = props.rows;
    let eventDataMap = [];
    //
    const function1 = () => {
        eventsData.map(x => eventDataMap.push({ nameOfEvent: x.nameOfEvent, participantNum: x.participantNum}));
        //setData(eventDataMap);
        console.log(eventsData);
        console.log(eventDataMap);
    }    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         data,
    //     };
    // }
    eventsData.map(x => eventDataMap.push({ nameOfEvent: x.nameOfEvent, participantNum: x.participantNum}));

    // const [data, setData] = useState([]);

    // const chartData = props.columns;
    // const [tempName, updateTemp] = useState();

    // const dataMe = props.rows.map(row => {props.columns.map(column => row[column.id, column.participantNum])});
    // const newData = props.rows.map(row => row[props.columns.id]);


    // render() {
    //     const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart
                    data={eventDataMap}
                >
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries
                        valueField="participantNum"
                        argumentField="nameOfEvent"
                    />
                    <Title text="Participant Numbers of Events" />
                    <Animation />
                </Chart>
                {/*<TableBody>*/}
                {/*    {props.rows.map(row => createTableRow(row))}*/}
                {/*    {function1}*/}
                {/*</TableBody>*/}
                <Button onClick={function1}> click me! </Button>
            </Paper>

        );
    // }
    // function createTableRow(row) {
    //     return (
    //         <TableRow hover role="checkbox" key={row.nameOfEvent}>
    //             {props.columns.map(column => createTableCell(column, row))}
    //         </TableRow>
    //     );
    // }
    //
    //
    // function createTableCell(column, row) {
    //
    //     let cellValue = row[column.id];
    //     // updateTemp(cellValue);
    //     return (
    //         <TableCell key={column.id} align={column.align}>
    //             {cellValue}
    //         </TableCell>
    //     );
    // }

}



