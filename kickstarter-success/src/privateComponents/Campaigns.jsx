import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {userInfo} from '../store/actions/userActions'
import {CircularProgress, TableContainer, Paper, makeStyles, Table, TableHead, TableCell, TableRow, TableBody} from '@material-ui/core'
import Campaign from './Campaign'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Campaigns = ({userInfo}) => {

    const history = useHistory()
    const user = useSelector(state => state)
    
    useEffect(()=>{
        userInfo()
    },[])
    if (user.errorMessage == "Request failed with status code 401"){
        window.localStorage.removeItem('token')
        history.push('/login')
    }

    const classes = useStyles();

    return (
        <>
            {user.loading ? <CircularProgress color="secondary" /> : 
                (<TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Campaingn ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Goal</TableCell>
                                <TableCell align="right">Currency</TableCell>
                                <TableCell align="right">Launch Date</TableCell>
                                <TableCell align="right">Success? (Prediction)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.userInfo.map(campaign => <Campaign info={campaign}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </>
    )
}

export default connect(null, {userInfo})(Campaigns)