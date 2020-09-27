import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import Avatar from 'react-avatar';
import { useSelector, useDispatch } from 'react-redux';
import { FormControlLabel, Switch } from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {LOGOUT, ERROR, DARK_MODE} from '../store/actions/userActions'

const NavBar = () => {
    const username = useSelector(state => state.username)
    const darkMode = useSelector(state => state.darkMode)
    const history = useHistory();
    const dispatch = useDispatch()
    const [token, setToken] = useState()
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
    const logoutHandler = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .get('/logout')
            .then(res => {
                window.localStorage.removeItem('token')
                dispatch({type: LOGOUT, payload: 'You have sucessfully logged out'})
                history.push('/login')
            })
            .catch(err => {})
    }
    useEffect(()=>{
        setToken(window.localStorage.getItem('token'))
        if (!token) {
            history.push('/login')
        }
    },[username])

    const urlChangeHandler = (path) => {
        dispatch({type: ERROR, payload: ''})
        history.push(`/${path}`)

    }

    const darkmodeHandler = (e) => {
        e.preventDefault()
        window.localStorage.setItem('darkMode', JSON.stringify(!darkMode))
        dispatch({type: DARK_MODE})
    }

    useEffect(()=>{
        const dm = window.localStorage.getItem('darkMode')
        if (dm) {
            dispatch({type: DARK_MODE, payload:dm})
        }
    },[])
    return (
        <Navbar className={darkMode ? 'navbar navbar-dark bg-dark' : 'navbar navbar-light'} light expand="md">
            <NavbarBrand onClick={()=>history.push('/')} className='pointer'>Kickstarter Success</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {token ? 
                    <NavItem className='pointer'>
                        <NavLink onClick={() => urlChangeHandler('dashboard')}>Dashboard</NavLink>
                    </NavItem> :
                    <>
                        <NavItem className='pointer'>
                            <NavLink onClick={()=> urlChangeHandler('login')}>Login</NavLink>
                        </NavItem>
                        <NavItem className='pointer'>
                            <NavLink onClick={()=> urlChangeHandler('register')}>Register</NavLink>
                        </NavItem>
                    </>
                    }
                </Nav>
                {token ? 
                    (  
                        <UncontrolledDropdown>
                            <DropdownToggle nav>
                                <Avatar color={Avatar.getRandomColor(['red', 'green', 'blue', 'orange', 'yellow', 'pink', 'purple'])} round={true} size='3rem' name={username}/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={()=> urlChangeHandler('profile')} className='pointer'>
                                    View Profile
                                </DropdownItem>
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={darkMode}
                                        onChange={darkmodeHandler}
                                        color="primary"
                                    />
                                    }
                                    label="Dark Mode"
                                />
                                <DropdownItem onClick={logoutHandler} className='pointer'>
                                    Sign Out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
                     : ''}
            </Collapse>
      </Navbar>
    )
}

export default NavBar