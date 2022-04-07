import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Container, Button, Row, Col,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [username, setUsername] = useState('')
  const [logged, setLogged] = useState(false)

  const navigate = useNavigate()

  const loggedIn = async () => {
    const { data } = await axios.get('/account/user')
    if (data.username) {
      setLogged(true)
      setUsername(data.username)
    }
  }

  const logout = async () => {
    await axios.post('/account/logout')
  }

  const loggedInView = () => (
    <Container>
      <Row>
        <Col>
          <h1>Campuswire Lite</h1>
          <p>
            Welcome,
            {` ${username}!`}
          </p>
        </Col>
        <Col>
          <Link style={{ float: 'right' }} className="text-muted" to="login" onClick={logout}>Log out?</Link>
        </Col>
      </Row>
      <Button>Add new Question +</Button>
    </Container>
  )

  const loggedOutView = () => (
    <Container>
      <Row>
        <Col>
          <h1>Campuswire Lite</h1>
        </Col>
      </Row>
      <Button onClick={() => navigate('/login')}>Log in to submit a question</Button>
    </Container>
  )

  useEffect(() => {
    loggedIn()
  }, [])

  return (
    <Container>
      {logged ? loggedInView() : loggedOutView()}
    </Container>
  )
}

export default Home
