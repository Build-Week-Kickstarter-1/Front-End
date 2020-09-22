import React from 'react';
import {TableCell, TableRow} from '@material-ui/core'

const Campaign = ({info}) => {

    return (
        <TableRow key={info.campaignid}>
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

export default Campaign