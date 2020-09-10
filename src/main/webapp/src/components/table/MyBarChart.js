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

// const data = [
//     { label: 'Name of Event', id: 'nameOfEvent', participantNum: 55 },
//     // { year: '1960', population: 3.018 },
//     // { year: '1970', population: 3.682 },
//     // { year: '1980', population: 4.440 },
//     // { year: '1990', population: 5.310 },
//     // { year: '2000', population: 6.127 },
//     // { year: '2010', population: 6.930 },
// ];

// export default class MyBarChart extends React.PureComponent {
export default function MyBartChart(props) {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         data,
    //     };
    // }

    const [data, setData] = useState();

    const chartData = props.columns;

    const dataMe = props.rows.map(row => {props.columns.map(column => row[column.id])});


    // render() {
    //     const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart
                    data={chartData}
                >
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries
                        valueField="participantNum"
                        argumentField="label"
                    />
                    <Title text="Participant Numbers of Events" />
                    <Animation />
                </Chart>
            </Paper>

        );
    // }
}

