import React from 'react';
import {TableCell, TableRow} from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const Campaign = ({info}) => {
    const history = useHistory()
    const editHandler = (e) => {
        e.preventDefault()
        history.push(`/campaign/${info.campaignid}`)
    }
    return (
        <TableRow key={info.campaignid} onClick={editHandler} >
            <TableCell >{info.campaignid}</TableCell>
            <TableCell align="right">{info.name}</TableCell>
            <TableCell align="right">{info.blurb}</TableCell>
            <TableCell align="right">{info.country}</TableCell>
            <TableCell align="right">${info.goal}</TableCell>
            <TableCell align="right">{info.launchdate}</TableCell>
            <TableCell align="right">{info.deadline}</TableCell>
            <TableCell align="right">{info.successprediction ? 'True' : 'False'}</TableCell>
        </TableRow>
    )
}

export default Campaign