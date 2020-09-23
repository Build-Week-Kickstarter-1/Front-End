import React, {useState} from 'react'
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
import { useSelector } from 'react-redux';

const NavBar = () => {
    const username = useSelector(state => state.username)
    const history = useHistory();
    const token = window.localStorage.getItem('token')
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
    const clickHandler = (e) => {
        e.preventDefault()
      }
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
                                <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} round={true} size='3rem' name={username} onClick={clickHandler}/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Profile
                                </DropdownItem>
                                <DropdownItem onClick={''}>
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