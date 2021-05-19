import {React,useState} from 'react'
import {Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import {Link, useHistory } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'


export default function Profile() {

    const [error, setError] = useState()
    const {currentUser } = useAuth()
    const { logout } = useAuth()
    const history = useHistory()


    async function handleLogout() {
        setError('')
        
        try{
            await logout()
            history.push('/login')
        } catch {
            setError('Logout Failed !')
        }
        
    }

    return (
        <>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email :</strong> {currentUser.email}
                    <Link to='/updateProfile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3">
                <Button variant='link' onClick={handleLogout}>Logout</Button>
                </div>    
            </CenteredContainer>
        </>
    )
}
