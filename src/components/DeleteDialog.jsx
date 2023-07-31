import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ToDoContext from "../context/ToDoContext";

function DeleteDialog(props) {
  const { deleteItem } = useContext(ToDoContext);
  return (
    <div>
      <Modal
        centered
        backdrop="static"
        aria-labelledby="Delete Modal"
        show={props.show}
        onHide={props.close}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
          <p>This action is irreversible.</p>
          <p> Unless you literally create the same task... :)</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteItem(props.id);
              props.close();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteDialog;
