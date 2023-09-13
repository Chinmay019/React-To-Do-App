import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToDoContext from "../context/ToDoContext";

function LoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [user, setUser] = useState("");
  const [validated, setValidated] = useState(false);
  const { isLoggedIn, dispatch } = useContext(ToDoContext);
  useEffect(() => {
    renderLoginModal();
  }, [showLoginModal]);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

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
    console.log(e.target.value);
  };
  const validUserName = () => {
    if (user.length > 3) {
      console.log(user);
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
            Test error message
          </div>
          <Form noValidate>
            {/* validated={validated} onSubmit={handleSubmit} */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Text id="passwordHelpBlock" className="mb-3 text-xl">
                Your username must be 3-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
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
