import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToDoContext from "../context/ToDoContext";
import { useFormik } from "formik";

function LoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [validated, setValidated] = useState(false);
  const { isLoggedIn, userName, setUserName, setIsLoggedIn } =
    useContext(ToDoContext);
  useEffect(() => {
    renderLoginModal();
  }, [showLoginModal]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const renderLoginModal = () => {
    if (!isLoggedIn) {
      setShowLoginModal(!isLoggedIn);
      //   return (
      //     <LoginModal
      //       show={showLoginModal}
      //       close={() => setShowLoginModal(false)}
      //     />
      //   );
    }
  };
  const handleChange = (e) => {
    setUserName(e.target.value);
    console.log(e.target.value);
  };
  const validUserName = () => {
    if (userName.length > 3) {
      console.log(userName);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
  //   console.log(formik.values);
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
          <div className="error-message">Test error message</div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            onClick={() => {
              if (validUserName()) {
                setShowLoginModal(false);
              } else {
                console.log("Please");
              }
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginModal;
