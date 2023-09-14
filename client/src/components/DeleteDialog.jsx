import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteItem, updateUserTasks } from "../context/TodoActions";
import ToDoContext from "../context/ToDoContext";

function DeleteDialog(props) {
  const { dispatch, user_OId, taskList, userName } = useContext(ToDoContext);

  const buildPayload = () => {
    const filteredList = taskList.filter((task) => task._id !== props.id);
    // tasks.push(...filteredList);
    return filteredList;
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    // const data = deleteItem(props.id);
    // console.log(data);
    const payload = buildPayload();
    console.log("payload: ", payload);
    const userData = updateUserTasks(userName, user_OId, payload);
    console.log("userData: ", userData);
    dispatch({ type: "SET_LOADING", payload: false });
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
