import {React, useState, useRef} from 'react'
import {Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useHistory } from 'react-router-dom'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleSubmit(event) {
        event.preventDefault()

       try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(error) {
          if(error){
            console.log(error)
            if(error.code === 'auth/user-not-found')
              setError('User not found, Check email below or Create new account')
            if(error.code === 'auth/invalid-password' || error.code === 'auth/wrong-password')
              setError('Invalid Password')
          }
            
        }
        setLoading(false)
        
    }

    return (
        <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgotPass">Forgot Password</Link>
          </div> 
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Create new account ?
        <Link to="/signup">Sign Up</Link>
      </div> 
    </>
    )
}
