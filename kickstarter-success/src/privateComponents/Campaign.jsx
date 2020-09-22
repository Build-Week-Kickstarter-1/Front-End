import React, { useEffect } from 'react';
import {CircularProgress, TableContainer, Paper, makeStyles, Table, TableHead, TableCell, TableRow, TableBody} from '@material-ui/core'


const Campaign = ({campaignid, name, category, goal, currency, launchdate, successprediction, info}) => {

    return (
        <TableRow key={campaignid}>
            <TableCell >{info.campaignid}</TableCell>
            <TableCell align="right">{info.name}</TableCell>
            <TableCell align="right">{info.category}</TableCell>
            <TableCell align="right">{info.goal}</TableCell>
            <TableCell align="right">{info.currency}</TableCell>
            <TableCell align="right">{info.launchdate}</TableCell>
            <TableCell align="right">{info.successprediction ? 'True' : 'False'}</TableCell>
        </TableRow>
    )
}

export default (Campaign)