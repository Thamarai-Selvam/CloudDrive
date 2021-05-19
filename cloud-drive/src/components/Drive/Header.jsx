import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { Link} from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <Navbar bg='light' expand='sm'>
                <Navbar.Brand as={Link} to="/">
                    CloudDrive
                </Navbar.Brand>
            
                <Nav>
                    <Nav.Link as={Link} to='/user'>
                        Profile
                    </Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}
