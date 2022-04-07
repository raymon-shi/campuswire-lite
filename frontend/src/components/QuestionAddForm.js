/* eslint-disable no-alert */
import axios from 'axios'
import React, { useState } from 'react'
import {
  Container, Form, Modal, Button,
} from 'react-bootstrap'

const QuestionAddForm = ({ questionModal, setQuestionModal }) => {
  const [questionText, setQuestionText] = useState('')

  const questionAdd = async () => {
    try {
      const { data } = await axios.post('/api/questions/add', { questionText })
    } catch (error) {
      alert('There was an error with adding a new question!')
    }
  }

  return (
    <Modal
      show={questionModal}
      onHide={() => setQuestionModal(false)}
      animation
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Question!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Enter your question:</Form.Label>
          <Form.Control as="textarea" rows={2} onChange={e => setQuestionText(e.target.value)} />
        </Form.Group>
        <Button
          className="w-100"
          type="button"
          style={{ background: '#01E8C2', border: 'none' }}
          onClick={() => {
            questionAdd()
            setQuestionModal(false)
          }}
        >
          Submit Question

        </Button>
        <Button className="w-100" type="button" style={{ background: '#FFFFFF', border: 'none', color: 'black' }} onClick={() => setQuestionModal(false)}>Close</Button>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
}

export default QuestionAddForm
