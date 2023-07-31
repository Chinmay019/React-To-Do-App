import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToDoContext from "../context/ToDoContext";

function EditDialog(props) {
  const { updateTask } = useContext(ToDoContext);

  const handleChange = (e) => {
    props.item.title = e.target.value;
  };

  return (
    <div>
      <Modal
        centered
        backdrop="static"
        aria-labelledby="Edit Modal"
        show={props.show}
        onHide={props.close}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                autoFocus
                defaultValue={props.title}
                onChange={handleChange}
                placeholder="Enter a value"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateTask(props.id, props.item);
              props.close();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditDialog;
