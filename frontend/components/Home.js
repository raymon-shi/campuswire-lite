import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Container, Button, Row, Col,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import QuestionAddForm from './QuestionAddForm'
import QuestionList from './QuestionList'

const Home = () => {
  const [username, setUsername] = useState('')
  const [logged, setLogged] = useState(false)
  const [questionModal, setQuestionModal] = useState(false)

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
      <Button style={{ background: '#01E8C2', border: 'none' }} onClick={() => setQuestionModal(true)}>Add new Question +</Button>
      {questionModal ? <QuestionAddForm questionModal={questionModal} setQuestionModal={setQuestionModal} /> : null}
      <Row>
        <QuestionList logged={logged} />
      </Row>
    </Container>
  )

  const loggedOutView = () => (
    <Container>
      <Row>
        <Col>
          <h1>Campuswire Lite</h1>
        </Col>
      </Row>
      <Button style={{ background: '#01E8C2', border: 'none' }} onClick={() => navigate('/login')}>Log in to submit a question</Button>
      <Row>
        <QuestionList logged={logged} />
      </Row>
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
