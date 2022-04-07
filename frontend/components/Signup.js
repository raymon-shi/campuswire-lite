/* eslint-disable no-alert */
import React, { useState } from 'react'
import {
  Container, Form, Button, Alert,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signupError, setSignupError] = useState('')

  const navigate = useNavigate()

  const signup = async () => {
    try {
      const { data } = await axios.post('/account/signup', { username, password })
      if (data) {
        navigate('/')
      }
    } catch (error) {
      setSignupError('User creation was unsuccessful! Username already in use!')
      alert('User creation was unsuccessful! Username already in use!')
    }
  }

  return (
    <Container className="w-25" style={{ float: 'left', position: 'flex' }}>
      <h1 style={{ fontWeight: 'bold' }}>Sign Up</h1>
      {signupError ? <Alert variant="danger">{signupError}</Alert> : null}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="button" className="w-100" onClick={signup}>
          Signup
        </Button>
        <Form.Text className="text-muted">
          Already have an account?
          {' '}
          <Link to="/login">Log in here!</Link>
        </Form.Text>
      </Form>
    </Container>
  )
}

export default Signup
