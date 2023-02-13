import React, {useState, useEffect} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function CallMicro({setModalShow,modalShow}) {
    
    // const [modalShow, setModalShow] = useState(true);
    return (
        <>
    
          <Modal show={modalShow} onHide={()=>setModalShow(!modalShow)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setModalShow(!modalShow)}>
                Close
              </Button>
              <Button variant="primary" onClick={()=>setModalShow(!modalShow)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
