import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  deleteItem,
  updateUserTasks,
  refreshCount,
} from "../context/TodoActions";
import ToDoContext from "../context/ToDoContext";

function DeleteDialog(props) {
  const { dispatch, user_OId, taskList, userName } = useContext(ToDoContext);

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    const data = await deleteItem(props.id);
    if (data.status == 201) {
      dispatch({ type: "DELETE_ITEM", payload: props.id });
      dispatch({ type: "SET_LOADING", payload: false });
      const count = refreshCount(taskList);
      dispatch({ type: "SET_UPDATED_COUNT", payload: count });
    } else if (data.status == 404) {
      dispatch({ type: "SET_LOADING", payload: true });
    }
    props.close();
  };
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
          <Button variant="danger" onClick={(e) => handleDeleteClick(e)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteDialog;
