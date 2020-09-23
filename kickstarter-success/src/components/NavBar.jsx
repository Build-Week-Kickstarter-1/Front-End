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
  DropdownItem
} from 'reactstrap';

import Avatar from 'react-avatar';
import { useSelector, useDispatch } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {LOGOUT} from '../store/actions/userActions'

const NavBar = () => {
    const username = useSelector(state => state.username)
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
                dispatch({type: LOGOUT, payload: 'you have sucessfully logged out'})
                history.push('/login')
            })
            .catch(err => {})
    }
    useEffect(()=>{
        setToken(window.localStorage.getItem('token'))
    },[username])
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand onClick={()=>history.push('/')}>CATALYST</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {token ? 
                    <NavItem>
                        <NavLink onClick={()=>history.push('/dashboard')}>Dashboard</NavLink>
                    </NavItem> :
                    <>
                        <NavItem>
                            <NavLink onClick={()=>history.push('/login')}>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={()=>history.push('/register')}>Register</NavLink>
                        </NavItem>
                    </>
                    }
                </Nav>
                {token ? 
                    (  
                        <UncontrolledDropdown>
                            <DropdownToggle nav>
                                <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} round={true} size='3rem' name={username}/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Profile
                                </DropdownItem>
                                <DropdownItem onClick={logoutHandler}>
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