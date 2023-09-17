import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToDoContext from "../context/ToDoContext";
import { v4 as uuidv4 } from "uuid";
import { createUser, checkIfExistingUser } from "../context/TodoActions";

function LoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [user, setUser] = useState("");
  const { isLoggedIn, dispatch, isExistingUser } = useContext(ToDoContext);
  useEffect(() => {
    renderLoginModal();
  }, [showLoginModal]);

  const createUserIfNotExisting = async () => {
    const { existingUser, userData } = await checkIfExistingUser(user);
    dispatch({ type: "SET_EXISTING_USER_STATUS", payload: existingUser });
    dispatch({ type: "SET_LOGGED_IN", payload: true });
    if (!existingUser) {
      const userId = uuidv4();
      const data = await createUser(user, userId);
    } else {
      dispatch({
        type: "SET_USER_ID",
        payload: { userId: userData.user_Id, user_OId: userData._id },
      });
      dispatch({ type: "SET_TASKS_FROM_DB", payload: userData.userTasks });
    }
  };

  const renderLoginModal = () => {
    if (!isLoggedIn) {
      setShowLoginModal(!isLoggedIn);
      return (
        <LoginModal
          show={showLoginModal}
          close={() => setShowLoginModal(false)}
        />
      );
    }
  };
  const setUserName = (e) => {
    e.preventDefault();
    if (validUserName()) {
      createUserIfNotExisting();
      dispatch({ type: "SET_USERNAME", payload: user });
      setShowLoginModal(false);
      dispatch({ type: "SET_LOGGED_IN", payload: true });
    } else {
      console.log("Please enter a valid userName");
      setShowErrorMessage(true);
    }
  };
  const handleChange = (e) => {
    setUser(e.target.value);
  };
  const validUserName = () => {
    if (user.length > 3) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <Modal
        centered
        size="xl"
        backdrop="static"
        aria-labelledby="Login Modal"
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="error-message"
            style={{ display: showErrorMessage ? "block" : "none" }}
          >
            <span>Please enter a valid username</span>
          </div>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Text id="passwordHelpBlock" className="mb-3 text-xl">
                <span>How it works</span>
                <ul>
                  <li>For every new username a database entry gets created.</li>
                  <li>No password is required to login</li>
                  <li>
                    ToDos added are mapped to username. So if you want to
                    persist your todos, try remembering your username 😜
                  </li>
                  <li>
                    Usernames are not encrypted as of now. Avoid using your own
                    names as your username.
                  </li>
                  <li>Be as creative as possible :)</li>
                </ul>
              </Form.Text>
              <Form.Text id="passwordHelpBlock" className="mb-3 text-xl">
                <h5>Basic Requirements for a UserName: </h5>
                <ul>
                  <li>
                    Must be at least 3 characters and at most 15 characters
                  </li>
                </ul>
              </Form.Text>
              <Form.Control
                type="text"
                name="userName"
                autoFocus
                defaultValue={""}
                onChange={handleChange}
                placeholder="Enter some cool name like Ramesh..."
                required
              />
              <Form.Control.Feedback type="invalid">
                UserName should be at least 3 characters.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => setUserName(e)}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginModal;
