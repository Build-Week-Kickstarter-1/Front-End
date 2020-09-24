import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {userInfo} from '../store/actions/userActions'
import {CircularProgress, TextField, TableContainer, Paper, makeStyles, Table, TableHead, TableCell, TableRow, TableBody} from '@material-ui/core'
import Campaign from './Campaign'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Campaigns = ({userInfo}) => {

    const history = useHistory()
    const user = useSelector(state => state)
    const [search, setSearch] = useState('')
    if (user.errorMessage === "Request failed with status code 401"){
        window.localStorage.removeItem('token')
        history.push('/login')
    }
    const classes = useStyles();
    const filter = user.userInfo.filter( campaign => {
        return campaign.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    useEffect(()=>{
        userInfo()
    },[])
    return (
        <>
            <TextField
                label='Search Campaign'
                variant="outlined"
                onChange={(e)=>setSearch(e.target.value)}
                value={search}
            />
            {user.loading ? <CircularProgress color="secondary" /> : 
                (<TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Campaingn ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Blurb</TableCell>
                                <TableCell align="right">Country</TableCell>
                                <TableCell align="right">Goal</TableCell>
                                <TableCell align="right">Launch Date</TableCell>
                                <TableCell align="right">Deadline</TableCell>
                                <TableCell align="right">Success? (Prediction)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filter.map(campaign => <Campaign info={campaign}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </>
    )
}

export default connect(null, {userInfo})(Campaigns)