/* eslint-disable no-alert */
import {
  Button, Container, Tab, Card, Form,
} from 'react-bootstrap'
import React, { useState } from 'react'
import axios from 'axios'

const Question = ({
  id, text, author, answer, questionList, logged,
}) => {
  const [newAnswer, setNewAnswer] = useState('')
  const answerQuestion = async () => {
    try {
      const { data } = await axios.post('/api/questions/answer', { answer: newAnswer, _id: id })
      if (data.answer) {
        questionList()
      }
    } catch (error) {
      alert('There was an error trying to answer the question')
    }
  }
  return (
    <Tab.Pane eventKey={`#${id}`}>
      <Container>
        <Card>
          <Card.Header as="h5">{text}</Card.Header>
          <Card.Body>
            <Card.Title>Author:</Card.Title>
            <Card.Text>
              {author}
            </Card.Text>
            <Card.Title>Answer:</Card.Title>
            <Card.Text>
              {answer || ''}
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        {logged ? (
          <Form onSubmit={() => {
            answerQuestion()
            setNewAnswer('')
          }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Answer this question:</Form.Label>
              <Form.Control as="textarea" value={newAnswer} rows={2} onChange={e => setNewAnswer(e.target.value)} />
              <Button
                style={{ background: '#01E8C2', border: 'none' }}
                className="w-100"
                disabled={!newAnswer}
                onClick={() => {
                  answerQuestion()
                  setNewAnswer('')
                }}
              >
                Submit Answer
              </Button>
            </Form.Group>

          </Form>
        ) : null}
      </Container>
    </Tab.Pane>

  )
}

export default Question
