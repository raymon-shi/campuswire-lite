/* eslint-disable no-alert */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Container, Card, Button, Tab, ListGroup, Sonnet, Row, Col,
} from 'react-bootstrap'
import Question from './Question'

const QuestionList = ({ logged }) => {
  const [user, setUser] = useState()
  const [questionsError, setQuestionsError] = useState('')
  const [questions, setQuestions] = useState([])

  const questionList = async () => {
    try {
      const { data } = await axios.get('/api/questions')
      setQuestions(data.reverse())
    } catch (error) {
      setQuestionsError('There was an error getting questions!')
      alert('There was an error getting questions!')
    }
  }

  useEffect(() => {
    questionList()
    const intervalID = setInterval(() => {
      questionList()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  // {questions.map(question => <Question variant="outline-primary" className="w-25 mt-3" key={question._id} text={question.question} author={question.author} answer={question.answer} />)}

  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <Tab.Container>
        <Row>
          <Col sm={4}>
            <ListGroup>
              {questions.map(q => <ListGroup.Item key={q._id} action href={`#${q._id}`}>{q.question}</ListGroup.Item>)}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {questions.map(q => <Question key={q._id} id={q._id} text={q.question} author={q.author} answer={q.answer} questionList={questionList} logged={logged} />)}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default QuestionList
