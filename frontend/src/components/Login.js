/* eslint-disable no-alert */
import React, { useState } from 'react'
import {
  Container, Form, Button, Alert,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const navigate = useNavigate()

  const login = async () => {
    try {
      const { data } = await axios.post('/account/login', { username, password })
      if (data) {
        navigate('/')
      }
    } catch (error) {
      setLoginError('You were unable to login. Check your username and password!')
      alert('You were unable to login. Check your username and password!')
    }
  }

  return (
    <Container className="w-25" style={{ float: 'left', position: 'flex' }}>
      <h1 style={{ fontWeight: 'bold' }}>Login</h1>
      {loginError ? <Alert variant="danger">{loginError}</Alert> : null}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="button" className="w-100" onClick={login}>
          Login
        </Button>
        <Form.Text className="text-muted">
          Dont have an account?
          {' '}
          <Link to="/signup">Sign up!</Link>
        </Form.Text>
      </Form>
    </Container>
  )
}

export default Login
